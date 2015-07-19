declare module THREE {
    class ColladaLoader {
        constructor();
        load(arg1: string, callback: any): void;
        options: Options
    }

    interface Options {
        convertUpAxis: boolean
    }
}