import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {defaultPath, readSourceAndContent} from "../utils/utils";
import {findNodeValue} from "../utils/findNodeValue";
import {ObjectLiteralExpression} from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function rebuildMenu(_options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const pathIds = defaultPath(_options, 'src/constants/menu-ides.ts', 'app/menu-ides.ts')
        const {source} = readSourceAndContent(tree, pathIds)

        const constant = findNodeValue(source, 'MenuIdes') as ObjectLiteralExpression
        const items = constant.properties.map(item => item.name?.getText()) as string[]
        const content = `export const MenuIdes = {
    ` + items.map((item, index) => ((index !== 0 ? '\n    ' : '') + item + ': ' + (index + 1))) + `
};`
        tree.overwrite(pathIds, content)
        return tree;
    };
}
