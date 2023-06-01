declare module "yandex-turbo-rss" {
  namespace YandexRss {
    type ChanelGeneratorOptions = {
      /**
       * Название RSS-канала.
       */
      title: string;
      /**
       * Домен сайта, данные которого транслируются.
       */
      link: string;
      /**
       * Описание канала одним предложением. Не используйте HTML-разметку.
       */
      description?: string;
    };

    type PageOptions = {
      /**
       * Заголовок страницы.
       */
      title: string;
      /**
       * Подзаголовок страницы.
       */
      subheading?: string;
      /**
       * Адрес изображения, которое используется в качестве обложки. Изображение может быть в любом формате.
       */
      image_url?: string;
      /**
       * Подпись к изображению обложки.
       */
      image_caption?: string;
      /**
       * URL страницы сайта, для которой нужно сформировать Турбо-страницу.
       */
      link: string;
      /**
       * Автор статьи, размещенной на странице.
       */
      author?: string;
      /**
       * Время публикации контента на сайте источника. Передается в формате RFC-822.
       */
      date: string;
      /**
       * Содержимое страницы
       */
      content: string;
    };

    /**
     * Генератор RSS канала
     */
    class ChanelGenerator {
      /**
       * Создание канала
       * @param options {ChanelGeneratorOptions}
       */
      constructor(options: ChanelGeneratorOptions);

      /**
       * Добавление страницы в канал
       * @param data {PageOptions}
       */
      item(data: PageOptions): this;

      /**
       * Получение XML
       */
      xml(): string;
    }
  }

  export default YandexRss.ChanelGenerator;
}
