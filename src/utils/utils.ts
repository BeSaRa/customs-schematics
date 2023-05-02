import {SchematicContext} from "@angular-devkit/schematics";
import {
    createSourceFile,
    ScriptTarget,
    SourceFile
} from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";

export function defaultPath(context: SchematicContext, path: string, debugPath: string): string {
    const {debug} = context.engine.workflow!.context
    return debug ? debugPath : path
}

export function readSource(path: string, content: string, parent = true): SourceFile {
    return createSourceFile(path, content, ScriptTarget.Latest, parent)
}
