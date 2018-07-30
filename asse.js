(function () {
    'use strict';
                    //↓ＨＴＭＬ内に設定した入力処のuser-name属性をuserNameInputにまとめた
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('asse');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    // 診断結果エリア
    //while (resultDivided.firstChild)//子供の要素がある限り削除
    //{
    //   resultDivided.removeChild(resultDivided.firstChild);
    //}
    //を分かりやすく下記のように出来る↓
    function removeAllChildren(element) {
        while (element.firstChild)
        {
            element.removeChild(element.firstChild);
                    }
    }

    //assessmentButton.onclick = function () {
    //    console.log('ボタンが押されました');
//};と、書く所が アロー関数を使うことで下記のようにfunction抜きで書けます

    assessmentButton.onclick = () => {
        //.valueで入力内容を反映　０文字なら処理終了
        const userName = userNameInput.value;
        if (userName.length === 0){
            return;
        }
        //console.log(userName);
    

        
    //文字を入れる<h3></h3>を作る「document.createElement('h3')」  ためにheaderって名前つけとく     
    removeAllChildren(resultDivided);//子を消す
    const header = document.createElement('h3');
    //中に文字入れ    
    header.innerText = '診断結果';
    //result-area(resultDividedに関連させた)にぶちこむ
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = asse(userName);
        //今度はpタグにして診断結果　（ｈタグより小さい
    paragraph.innerText = result;
    // 同じくresult-area(resultDividedに関連させた)にぶちこむ    
    resultDivided.appendChild(paragraph);
    //TODO ツイートエリア作成
    removeAllChildren(tweetDivided);
    //encodeURIComponent 関数で URI エンコードへの変換
    //decodeURIComponent 関数で URI エンコードから復元 
        //※文字列の中にシングルクオートが入っている場合には、
        //\ を使ってエスケープ処理をすれば入力できる
    //missComponetが小文字、&refの&忘れ、''忘れ
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
        + encodeURIComponent('特徴')
    + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href',hrefValue);
    anchor.className = 'twitter-hashtag-button';
    //↓何故か表示されない  'ほげ'も無理  
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'オリジナルtweet #特徴';
    tweetDivided.appendChild(anchor);    
        
    twttr.widgets.load();  
        
//Tips　リバースエンジニアリングできました↑
        
    //enterでもできるようにする
    //うまくいかん！これどこにいれるの！？この枠外に入れても無理
userNameInput.onkeydown = (event) => {
    if (event.keyCode === 13) {
        assessmentButton.onclick();
    }
};      
    };
    const answers = [
        '{userName}のいいところは声です。{userName}の特徴的な声はみなを惹きつけ、心に残ります。',
        '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
        '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
        '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
        '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
        '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
        '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
        '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
        '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
        '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
        '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
        '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
        '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
        '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
        '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
        '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
        '{userName}のいいところはカリスマ性です。あなたのカリスマや立ち振る舞いに多くの人が刺激されています。'
    ];
    function asse(userName) {
                //全部の文字コード番号を取得してそれを足してあわせる
        //letはif,for等の{}でのみ機能する安全
        let sumOfcharCode = 0;
        for (let i = 0; i < userName.length; i++)
        {
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }
        //文字コードの合計を回答(占い結果)の数で割って添え字の数値を求める
        const index = sumOfcharCode % answers.length;
        let result = answers[index];
        //正規表現でuserNameを名前に置き換える
        result = result.replace(/{userName}/g, userName);
        return result;
    }
   
    //console.log(asse('れれれれ'));
    //console.log(asse('太郎'));

        // テストコード
        console.assert(
            asse('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
            '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
        );
        console.assert(
            asse('太郎') === asse('太郎'),
            '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
        );
})();
