import { useParams } from "react-router";

export const Home = () => {
    const {lang} = useParams();

    const content = {
        ko: {
          greeting: '안녕하세요!',
          description: '이것은 한국어 페이지입니다.',
        },
        en: {
          greeting: 'Hello!',
          description: 'This is an English page.',
        },
        jp: {
          greeting: 'こんにちは！',
          description: 'これは日本語のページです。',
        },
      };

      const language = content[lang];
      if(!language){
        return <div>지원하지 않는 언어입니다</div>
      }
    

    return(
        <>
             <h2>{language.greeting}</h2>
             <p>{language.description}</p>
        </>
       
    )
}