declare module 'negotiator' {
    export default class Negotiator {
        constructor(request: any);

        mediaTypes(available: string[]): string[];

        mediaType(available: string[]): string | undefined;

        charsets(available: string[]): string[];

        charset(available: string[]): string | undefined;

        languages(available?: string[]): string[];

        language(available: string[]): string | undefined;

        encoding(available: string[]): string | undefined;
    }
}