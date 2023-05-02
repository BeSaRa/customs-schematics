import {
  apply,
  applyTemplates,
  chain, mergeWith,
  move,
  Rule,
  SchematicContext,
  strings,
  Tree,
  url
} from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function createModel(_options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      applyTemplates({
        ..._options,
        ...strings
      }),
      move('.')
    ])
    return chain([mergeWith(templateSource)]);
  };
}
