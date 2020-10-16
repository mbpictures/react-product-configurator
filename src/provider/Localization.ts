import LocalizedStrings, { LocalizedStringsMethods } from "react-localization";

export interface LocalizationStrings {
    buy: string;
    confirm: string;
    cancel: string;
    price: string;
    summary: string;
    total: string;
    privacyPolicyButton: string;
    privacyPolicyDescription: string;
}

export const DefaultLocalization: Record<string, LocalizationStrings> = {
    en: {
        buy: "Buy",
        confirm: "Confirm",
        cancel: "Cancel",
        price: "Price",
        summary: "Summary",
        total: "Total",
        privacyPolicyButton: "Privacy Policy",
        privacyPolicyDescription: "With buying this product you accept our {0}",
    },
    de: {
        buy: "Kaufen",
        confirm: "Bestätigen",
        cancel: "Abbrechen",
        price: "Preis",
        summary: "Übersicht",
        total: "Gesamt",
        privacyPolicyButton: "Datenschutzbestimmungen",
        privacyPolicyDescription:
            "Mit dem Kauf dieses Produkts stimmen Sie den {0} zu.",
    },
};

export const DefaultFlagMapping: Record<string, string> = {
    en: "gb",
    de: "de",
};

export class LocalizationProvider {
    // singleton members
    private static _instance?: LocalizationProvider = undefined;

    static get Instance(): LocalizationProvider {
        if (this._instance === undefined)
            this._instance = new LocalizationProvider();
        return this._instance;
    }

    private constructor() {
        this._localizedStrings = new LocalizedStrings(DefaultLocalization);
        this._language = this.language;
        this._flagMapping = DefaultFlagMapping;
    }

    // MAIN part
    private _localizedStrings: any & LocalizedStringsMethods;

    private _onLanguageChanged: ((newLanguage: string) => any)[] = [];
    localizeItems: boolean = false;
    private _language: string;
    private _flagMapping: Record<string, string>;

    get localizedStrings(): Record<string, string> & LocalizedStringsMethods {
        return this._localizedStrings;
    }

    set flagMapping(flagMapping: Record<string, string>) {
        this._flagMapping = flagMapping;
    }

    getFlagCode(language: string): string {
        if (!(language in this._flagMapping)) return language;
        return this._flagMapping[language];
    }

    setOnLanguageChanged(
        callback: (newLanguage: string) => any,
        context?: any
    ) {
        this._onLanguageChanged.push(callback.bind(context));
    }

    set translations(newTranslations: Record<string, Record<string, string>>) {
        const translationObject: Record<
            string,
            Record<string, string>
        > = this.mergeObjects(DefaultLocalization, newTranslations);
        this._localizedStrings = new LocalizedStrings(translationObject);
        this._localizedStrings.setLanguage(this._language);
    }

    // see: https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6
    private mergeObjects(
        target: any,
        source: any
    ): Record<string, Record<string, string>> {
        for (const key of Object.keys(source)) {
            if (source[key] instanceof Object)
                Object.assign(
                    source[key],
                    this.mergeObjects(target[key], source[key])
                );
        }

        // Join `target` and modified `source`
        Object.assign(target || {}, source);
        return target;
    }

    getTranslation(key: string, isItem?: boolean): string {
        if (!(key in this._localizedStrings) || (isItem && !this.localizeItems))
            return key;
        return this._localizedStrings[key];
    }

    getFormattedTranslation(
        basicKey: string,
        ...languageKeys: string[]
    ): string {
        const translatedKeys: string[] = [];
        languageKeys.forEach((langKey) => {
            translatedKeys.push(this.getTranslation(langKey));
        });
        const result: string | string[] = this._localizedStrings.formatString(
            basicKey,
            ...translatedKeys
        );
        if (typeof result === "string") return result;
        return result.join(" ");
    }

    set language(languageKey: string) {
        this._language = languageKey;
        this._localizedStrings.setLanguage(languageKey);
        this.invokeLanguageChangedCallbacks(languageKey);
    }

    get language(): string {
        return this._localizedStrings.getLanguage();
    }

    get availableLanguages(): string[] {
        return this._localizedStrings.getAvailableLanguages();
    }

    private invokeLanguageChangedCallbacks(newLanguage: string) {
        this._onLanguageChanged.forEach((callback) => callback(newLanguage));
    }
}
