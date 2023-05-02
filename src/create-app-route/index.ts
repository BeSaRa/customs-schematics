import {Rule, SchematicContext, SchematicsException, strings, Tree} from '@angular-devkit/schematics';
import {defaultPath, readSourceAndContent} from "../utils/utils";
import {findNodes} from "@schematics/angular/utility/ast-utils";
import {
    isObjectLiteralExpression
} from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";
import {insertToObject} from "../utils/insertToObject";
import {applyToUpdateRecorder} from "@schematics/angular/utility/change";


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function createAppRoute(_options: { name: string , debugMode: boolean }): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const path = defaultPath(_options, 'src/constants/app-routes.ts', 'app/app-routes.ts')
        const {source} = readSourceAndContent(tree, path)
        const variable = findNodes(source, isObjectLiteralExpression)
        if (!variable.length)
            throw new SchematicsException('cannot find the AppRoutes Variable!')
        const recorder = tree.beginUpdate(path)
        const change = insertToObject(variable[0], strings.underscore(_options.name).toUpperCase(), `'${strings.dasherize(_options.name).toLowerCase()}'`)
        applyToUpdateRecorder(recorder, [change])
        tree.commitUpdate(recorder)
        return tree;
    };
}
