import './App.css'
import {BrowserRouter} from 'react-router-dom'
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: {
        translation: {
          "Search": "Search",
          "Add review": "Add review",
          "Go out":"Go out",
          "Login":"Login",
          "Author:":"Author",
          "Author's rating":"Author's rating",
          "Published":"Published",
          "Average rating":"Average rating",
          "Rate first":"Rate first",
          "Categories":"Categories",
          "Comment":"Comment",
          "Rate":"Rate",
          "No comments":"No comments",
          "Last reviews":"Last reviews",
          "Delete review":"Delete review",
          "Select type":"Select type",
          "Review title":"Review title",
          "Review text":"Review text",
          "Add image":"Add image",
          "Post review":"Post review",
          "Admin":"Admin",
          "Login as":"Login as",
          "There is not anyone":"There is not anyone",
          "Login using E-mail and password":"Login using E-mail and password",
          "Registration":"Registration",
          "Login via social network":"Login via social network",
          "Comments":"Comments",
          "":"",
          "":"",
          "":"",
          "":"",

        }
      },
      ru: {
        translation: {
          "Search": "Поиск",
          "Add review": "Добавить отзыв",
          "Go out":"Выйти",
          "Login":"Войти",
          "Author":"Автор",
          "Author's rating":"Оценка автора",
          "Published":"Опубликовано",
          "Average rating":"Средняя оценка обзора",
          "Rate first":"Оцени обзор первым",
          "Categories":"Категории",
          "Comment":"Оставить комментарий",
          "Rate":"Оценить",
          "No comments":"Комментариев нет",
          "Last reviews":"Последние обзоры",
          "Delete review":"Удалить обзор",
          "Select type":"Выберите тип",
          "Review title":"",
          "Review text":"Текст обзора",
          "Add image":"Добавить изображение",
          "Post review":"Опубликовать обзор",
          "Admin":"Админ",
          "Login as":"Войти как",
          "There is not anyone":"Никого нет ",
          "Login using E-mail and password":"Войти используя E-mail и пароль",
          "Registration":"Регистрация",
          "Login via social network":"Войти через социальную сеть",
          "Comments":"Комментарии",
          "":"",
          "":"",
          "":"",
        }
      }
    },
    lng: "en", 
    fallbackLng: "en",

    interpolation: {
      escapeValue: false 
    }
  });


const App = () => {

  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
