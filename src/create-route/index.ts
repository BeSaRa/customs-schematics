import {Rule, SchematicContext, strings, Tree} from '@angular-devkit/schematics';
import {defaultPath, readSourceAndContent} from "../utils/utils";
import {ArrayLiteralExpression} from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";
import {findNodeValue} from "../utils/findNodeValue";
import {classify, dasherize} from "@angular-devkit/core/src/utils/strings";
import {insertToArray} from "../utils/insertToArray";
import {applyToUpdateRecorder} from "@schematics/angular/utility/change";
import {insertImport} from "@schematics/angular/utility/ast-utils";


function generateRoute(options: { name: string }): string {
    return `{
    path: AppRoutes.${strings.underscore(options.name).toUpperCase()},
    component: ${classify(dasherize(options.name))}Component,
  }`
}

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function createRoute(_options: { name: string, debugMode: boolean }): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const path = defaultPath(_options, 'src/modules/administration/administration-routing.module.ts', 'app/administration-routing.module.ts');
        const componentName = `${classify(dasherize(_options.name))}Component`
        const importPath = `@modules/administration/components/${dasherize(_options.name)}/${dasherize(_options.name)}.component`
        const {source} = readSourceAndContent(tree, path)

        const array = findNodeValue<ArrayLiteralExpression>(source, 'routes')

        const change = insertToArray(array!, generateRoute(_options))
        const recorder = tree.beginUpdate(path)
        const importChange = insertImport(source, path, componentName, importPath)
        applyToUpdateRecorder(recorder, [change, importChange])
        tree.commitUpdate(recorder)
        return tree;
    };
}
