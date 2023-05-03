import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {underscore} from "@angular-devkit/core/src/utils/strings";
import {defaultPath, readSourceAndContent} from "../utils/utils";
import {findNode} from "@schematics/angular/utility/ast-utils";
import {
    InterfaceDeclaration,
    SyntaxKind
} from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";
import {applyToUpdateRecorder, InsertChange} from "@schematics/angular/utility/change";


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function updateLanguage(_options: { name: string, debugMode: boolean }): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        _options.name = 'menu_' + underscore(_options.name).toLowerCase()
        const path = defaultPath(_options, 'src/contracts/lang-keys-contract.ts', 'app/lang-keys-contract.ts');
        const {source} = readSourceAndContent(tree, path)
        const declaration = findNode(source, SyntaxKind.Identifier, 'LangKeysContract')!.parent as InterfaceDeclaration
        const recorder = tree.beginUpdate(path)
        const matches = (declaration.members[0] || declaration.members).getFullText().match(/^(\r?\n)(\s*)/);
        applyToUpdateRecorder(recorder, [
            new InsertChange(path, declaration.members.pos, (matches ? matches[0] : '') + (`${_options.name} : string;`))
        ])
        tree.commitUpdate(recorder)
        return tree;
    };
}
