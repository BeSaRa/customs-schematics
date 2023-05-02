import {Tree} from "@angular-devkit/schematics";
import {
    createSourceFile,
    ScriptTarget,
    SourceFile
} from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";

export function defaultPath({debugMode}: { debugMode: boolean }, path: string, debugPath: string): string {
    return debugMode ? debugPath : path
}

export function readSource(path: string, content: string, parent = true): SourceFile {
    return createSourceFile(path, content, ScriptTarget.Latest, parent)
}

export function readSourceAndContent(tree: Tree, path: string): { source: SourceFile, content: string } {
    const content = tree.readText(path)
    const source = readSource(path, content)
    return {source, content}
}
