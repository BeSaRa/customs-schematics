import {chain, Rule, schematic, SchematicContext, Tree} from '@angular-devkit/schematics';
import {AppSchematics} from "../schematics";


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function createAdminService(_options: { name: string, url: string, parent: string, debugMode: boolean }): Rule {
    return (_tree: Tree, _context: SchematicContext) => {
        const rules = AppSchematics.map((item: string) => {
            return schematic(item, _options, {
                interactive: false
            })
        })
        return chain([...rules, schematic('app-lint', _options)])
    };
}
