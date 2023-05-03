import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {defaultPath, readSourceAndContent} from "../utils/utils";
import {addDeclarationToModule} from "@schematics/angular/utility/ast-utils";
import {classify, dasherize} from "@angular-devkit/core/src/utils/strings";
import {applyToUpdateRecorder} from "@schematics/angular/utility/change";


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function updateImports(_options: { name: string, debugMode: boolean }): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const path = defaultPath(_options, 'src/modules/administration/administration.module.ts', 'app/administration.module.ts')
        const {source} = readSourceAndContent(tree, path)
        const classifiedName = classify(_options.name) + 'Component'
        const popupClassifiedName = classify(_options.name) + 'PopupComponent'
        const dashedName = dasherize(_options.name)
        const mainComponentImportPath = `@modules/administration/components/${dashedName}/${dashedName}.component`
        const popupComponentImportPath = `@modules/administration/components/${dashedName}-popup/${dashedName}-popup.component`

        const recorder = tree.beginUpdate(path)
        const mainChange = addDeclarationToModule(source, path, classifiedName, mainComponentImportPath)
        const subChange = addDeclarationToModule(source, path, popupClassifiedName, popupComponentImportPath)

        applyToUpdateRecorder(recorder, mainChange.concat(subChange))
        tree.commitUpdate(recorder)

        return tree
    };
}
