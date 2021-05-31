# react-product-configurator

[![NPM](https://img.shields.io/npm/v/react-product-configurator.svg)](https://www.npmjs.com/package/react-product-configurator) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![DeepScan grade](https://deepscan.io/api/teams/10967/projects/14096/branches/253069/badge/grade.svg?token=a1fa0980263b30233c0ddf1e9c3ed778290db2ee)](https://deepscan.io/dashboard#view=project&tid=10967&pid=14096&bid=253069)

Embed an easy to use, lightweight and responsive product configurator in your react app.

[Live Demo](http://projects.marius-butz.de/react-product-configurator)

[Example app](example/)
## Install

```bash
npm install --save react-product-configurator
```

## Usage

```tsx
import { ProductConfigurator, ItemConfiguration } from 'react-product-configurator'
import 'react-product-configurator/dist/index.css'

class Example extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.onBuy = this.onBuy.bind(this);
    }

    onBuy(selection: ItemConfiguration) {
        console.log("Selected products: " + JSON.stringify(selection));
    }

    render() {
        const cats = { ... }; // retrieve from database, static json, etc.

        return <ProductConfigurator
                       name="Backpack"
                       categories={cats}
                       preloadImages
                       onBuy={this.onBuy} />
    }
}
```

### Callbacks
The ProductConfigurator Components comes with three callbacks: onBuy, onAbortBuy, onPrivacyPolicy.
* ```onBuy(selection: ItemConfiguration) => any (optional)```: Called when the user confirms his selection in the summary. The parameter represents the user selection in form of a json array which consists by the category name as the key and as value the type [item](#item).
* ```onAbortBuy() => any (optional)```: Called when the user cancels the buy process in the summary dialog either by pressing the "Cancel"-button or by clicking outside of the popup.
* ```onBack() => any (optional)```: Called when the user clicks the "back"-Button. When the "back"-button isn't enabled, this callback won't be fired.
* ```onPrivacyPolicy() => any (optional)```: Called when the user clicked the "privacy policy"-button in the summary dialog.
* ```onItemChange(category: string, item: Item) => any```: Called after the user changed his current item selection.

### Properties
* ```name: string```: Product name (displayed in sidebar)
* ```preloadImages: boolean (optional)```: Preload all images when the user opens the page. This reduces the latency when the user selects a non default item.
* ```categories: Category[]```: Description of your product. Here all information like layers, category names, variations, prices, etc. are stored. See [category](#category)
* ```displayBackButton: boolean (optional)```: Show a "back"-button in the top-left corner. Useful to navigate the user back to your main webpage.
* ```displayLanguageDropdown: boolean (optional)```: Show a language dropdown in the top-left corner, where the user can switch the language of the app.
* ```backButton: React.ReactNode (optional)```: Display a non-default back button. Default icon: ChevronLeft.
* ```showLoadingScreen: boolean (optional)```: Show loading screen while all images are preloading. This option will only work in combination with "preloadImages", otherwise no loading screen will be shown.
* ```theme: "light" | "dark" | Theme (optional)```: Customize the appearance by either a predefined or custom theme. There are currently two predefined themes ("light" and "dark") available. You can also use a custom generated mui theme.
* ```translation: Record<string, Record<string, string>> (optional)```: Override or add custom translations with this property. If you want to translate your categories or items, use the name of them as the key of the translation object. To add more languages, simply add them simultaneously with a two letter language code as the key. The object has to be in this format:
  ```JavaScript
  {
    de: {
        KEY: "Übersetzung",
        ...
    },
    en: {
        KEY: "Translation",
        ...
    },
    ...
  }
  ```
* ```localizeItems: boolean (optional)```: Localize item names. If false, the name of the category definition will be used.
### Types
#### Category
* ```name: string```: Category name
* ```layer: number (optional)```: Layer of this category (useful when product images are split in layers).
* ```items: Item[]```: An [item](#item) is the visual representation of a different model of the same product part (e.g. different color of the subject).

#### Item
* ```name: string```: Name of the model (e.g. the color).
* ```price: number (optional)```: Additional price for this kind of model (e.g. different sizes which are more expensive).
* ```image: string```: The visual representation of the model. The size of all images has to be the same and the background has to be transparent as those images are layered over each other.
* ```thumbnail: string (optional)```: Thumbnail-image displayed in the sidebar.
* ```color: string (optional)```: Use a colored circle instead of a thumbnail-image.
* ```default: boolean (optional)```: This the default model of a category (e.g. the base variation).
* ```layer: number (optional)```: Different layer than the category has. Specifying no layer will use the layer of the category or 0.

#### ItemConfiguration
Typing: ```{ [keys: string]: Item}```. This type represents the current user selected product configuration. The keys represent the category names and the value the current model of this category.

### Localization
You can access the LocalizationProvider by calling ```LocalizationProvider.Instance```, which returns an instance of the LocalizationProvider singleton. With that, you are able to modify the localization behaviour of the app.
* ```localizedStrings```: Get an instance of the localization object (from the react-localization module)
* ```flagMapping (set only)```: Set an custom mapping object from language code to flag (from the react-flag-icon-css package). Example: ```DefaultFlagMapping```.
* ```localizeItems```: Get or set whether to localize item names or not.
* ```getFlagCode(language: string): string```: Get the flag code by language code
* ```setOnLanguageChanged(callback: (newlanguage: string) => any, context?: any)```: Register a new callback, which is fired, when the language changes.
* ```translations(newTranslations: Record<string, Record<string, string>>)```: Set new localization data with default or custom translations. (Example in Properties category)
* ```getTranslation(key: string, isItem?: boolean)```: Get a translated text. If isItem is true, the ```localizeItems``` attribute will be considered.
* ```getFormattedTranslation(basicKey: string, ...languageKeys: string[])```: Inject the translations of all ```languageKeys``` into the translation of ```basicKey```, when it contains placeholders (```{0}```, ```{1}```, ...).
* ```language```: Get or set the current user language.
* ```availableLanguages: string[]```: Get a array of supported languages
## License

MIT © [Marius Butz](https://github.com/mbpictures)
