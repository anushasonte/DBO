import { useTranslation } from "react-i18next";
import ReactLanguageSelect from "react-languages-select";

 const SwitchLanguage = () => {
  const [t, i18n] = useTranslation("common");
  

  onSelectLanguage = (languageCode) => {
    const languageCode = sessionStorage.getItem(
      Constants.USER_LANGUAGE_ID_SESSION_ATTRIBUTE_NAME
    );
    
    i18n.changeLanguage(languageCode);
  };

  return (
    <ReactLanguageSelect
      languages={["en", "fr", "de", "it", "es"]}
      customLabels={{ en: "EN-US", fr: "FR", de: "DE", it: "IT" }}
      defaultLanguage="en"
      showSelectedLabel={false}
      showOptionLabel={false}
      selectedSize={18}
      optionsSize={16}
      onSelect={this.onSelectLanguage}
      className="menu-languages"
    />
  );
};

export default SwitchLanguage;