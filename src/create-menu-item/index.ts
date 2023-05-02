import {Rule, SchematicContext, SchematicsException, strings, Tree} from '@angular-devkit/schematics';
import {defaultPath, readSourceAndContent} from "../utils/utils";
import {findNodes} from "@schematics/angular/utility/ast-utils";
import {
    isArrayLiteralExpression,
    isObjectLiteralExpression
} from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";
import {insertToObject} from "../utils/insertToObject";
import {applyToUpdateRecorder} from "@schematics/angular/utility/change";
import {insertToArray} from "../utils/insertToArray";

function generateMenu({name, parent}: { name: string, parent?: string, debugMode: boolean }) {
    const realName = strings.underscore(name).toUpperCase()
    return `{
    id: MenuIdes.${realName},
    langKey: 'menu_${strings.underscore(realName).toLowerCase()}',
    icon: AppIcons.SETTINGS,
    path: AppFullRoutes.${realName},${parent ? `\n    parent: MenuIdes.${strings.underscore(parent).toUpperCase()},` : ``}
  },`
}

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function createMenuItem(_options: { name: string, parent: string, debugMode: boolean }): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const pathIds = defaultPath(_options, 'src/constants/menu-ides.ts', 'app/menu-ides.ts')
        const {source: idsSource} = readSourceAndContent(tree, pathIds)

        const idsVariables = findNodes(idsSource, isObjectLiteralExpression)
        if (!idsVariables.length)
            throw new SchematicsException('cannot find the MenuIdes Variable!')

        // console.log(menuSource);
        const recorder = tree.beginUpdate(pathIds)
        const idChange = insertToObject(idsVariables[0], strings.underscore(_options.name).toUpperCase(), (idsVariables[0].properties.length + 1).toString())
        applyToUpdateRecorder(recorder, [idChange])
        tree.commitUpdate(recorder)


        const pathMenu = defaultPath(_options, 'src/constants/menus.ts', 'app/menus.ts')
        const {source: menuSource} = readSourceAndContent(tree, pathMenu)


        const menuArray = findNodes(menuSource, isArrayLiteralExpression)
        if (!menuArray.length)
            throw new SchematicsException('there is no menu array ')

        const menuRecorder = tree.beginUpdate(pathMenu)
        const menuChange = insertToArray(menuArray[0], generateMenu(_options))
        applyToUpdateRecorder(menuRecorder, [menuChange])
        tree.commitUpdate(menuRecorder)
        return tree;
    };
}
