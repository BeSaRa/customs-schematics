import {Rule, SchematicContext, SchematicsException, strings, Tree} from '@angular-devkit/schematics';
import {EndpointOptions} from "./endpoint-options";
import {defaultPath, readSource} from "../utils/utils";
import {findNodes} from "@schematics/angular/utility/ast-utils";
import {
    isObjectLiteralExpression
} from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";
import {insertToObject} from "../utils/insertToObject";
import {applyToUpdateRecorder} from "@schematics/angular/utility/change";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function createEndpoint(_options: EndpointOptions): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const path = defaultPath(_context, 'app/endpoints.ts', 'app/endpoints.ts')
        const content = tree.readText(path)
        const source = readSource(path, content)
        const variable = findNodes(source, isObjectLiteralExpression)
        if (!variable.length)
            throw new SchematicsException('cannot find the EndPoints Variable!')

        _options.name = strings.underscore(_options.name).toUpperCase()
        const recorder = tree.beginUpdate(path)
        const change = insertToObject(variable[0], _options.name, `'${_options.url}'`)
        applyToUpdateRecorder(recorder, [change])
        tree.commitUpdate(recorder)
        return tree;
    };
}
