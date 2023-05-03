import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {execSync} from "child_process";


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function appLint(): Rule {
    return (_tree: Tree, _context: SchematicContext) => {
        _context.logger.info(`Executing: npm run lint --fix`);
        execSync('eslint --fix')
    };
}
