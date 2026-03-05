export interface BaseProjectModule {
    getHtml(): string
    toJson(): string
    getType(): string
    getId(): string
}

export abstract class ProjectModule implements BaseProjectModule {

    public readonly moduleName: string;
    private readonly id: string;

    protected constructor(moduleName: string) {
        this.moduleName = moduleName;
        this.id = this.generateUuid();
    }

    abstract getHtml(): string;
    abstract toJsonData(): string;

    toJson(): string {
        return JSON.stringify({
            data: this.toJsonData(),
            type: this.moduleName,
        });
    }

    getType(): string {
        return this.moduleName;
    }

    getId(): string {
        return this.id;
    }

    private generateUuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replaceAll(/[xy]/g, function (c) {
            const r = Math.trunc(Math.random() * 16), v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
