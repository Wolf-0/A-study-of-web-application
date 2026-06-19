(()=> {//即時関数で囲いグローバル変数の汚染を防止
    //$は明示的dom要素
    const $doc = document;
    const $tab = $doc.getElementById('js-tab');
    const $nav = $tab.querySelectorAll('[data-nav]');
    const $content = $tab.querySelectorAll('[data-content]');
    const $selected_class = $tab.querySelectorAll('[data-group]');
    const $submit_btn = $doc.getElementById('js-submit-btn');
    const $score_error = $doc.getElementById('js-score_error');
    const $submit_btn_error = $doc.getElementById('js-submit-btn-error');
    const ACTIVECLASS = 'active'; //refactaring

    //初期化: data-content[0]についてcssのblockstyleを当てる
    const init = () => {
        $content[0].style.display = 'block';
        $nav[0].classList.add(ACTIVECLASS);
    };
    init();

    //クリックで発火
    $nav.forEach((nav, index) => {
        nav.addEventListener('click', (e) => {
            e.preventDefault(); //aタグのデフォルトイベントをキャンセル
            $content.forEach(content => {
                content.style.display = 'none';
                content.style.zIndex = '0';
            });
            $nav.forEach(nav => {
                nav.classList.remove(ACTIVECLASS);
            });
            $content[index].style.display = 'block';
            $content[index].style.zIndex = '1';
            $nav[index].classList.add(ACTIVECLASS);
        });
    });

    $submit_btn.addEventListener('click', (e) => {
        e.preventDefault();
        const $score = $doc.getElementById("select-score").value;
        score = Number($score);
        const $1_1 = $doc.querySelector('input[name="1-grade"]:checked')?.value;
        const $1_2 = $doc.querySelector('input[name="1-class"]:checked')?.value;
        const $2_1 = $doc.querySelector('input[name="2-grade"]:checked')?.value;
        const $2_2 = $doc.querySelector('input[name="2-class"]:checked')?.value;
        const $3_1 = $doc.querySelector('input[name="3-grade"]:checked')?.value;
        const $3_2 = $doc.querySelector('input[name="3-class"]:checked')?.value;
        const $4_1 = $doc.querySelector('input[name="4-grade"]:checked')?.value;
        const $4_2 = $doc.querySelector('input[name="4-class"]:checked')?.value;
        let Result_Array = new Array(24).fill(0);
        // Validation: scoreが空の場合、1人目の学年とクラスが選択されていない場合はエラーを表示
        if ($score === "") {
            $score_error.classList.remove('hidden');
            return;
        }
        $score_error.classList.add('hidden');
        if ($1_1 === undefined || $1_2 === undefined) {
            $submit_btn_error.classList.remove('hidden');
            return;
        }
        $submit_btn_error.classList.add('hidden');
        const classes = [
            [$1_1, $1_2],
            [$2_1, $2_2],
            [$3_1, $3_2],
            [$4_1, $4_2]
        ];
        for (const [gradeRaw, groupRaw] of classes) {
            const grade = Number(gradeRaw);
            const group = Number(groupRaw);
            if (
                !Number.isInteger(grade) ||
                !Number.isInteger(group) ||
                grade < 1 || grade > 3 ||
                group < 1 || group > 8
            ) {
                continue;
            }
            const index = (grade - 1) * 8 + (group - 1);
            Result_Array[index] += score;
        }
        console.log(Result_Array);
        //dailog を使うとPopUp簡単らしい
        alert('送信されました'+Result_Array);
    });
})();
//radio選択解除の関数onclickは即時関数の外で定義する必要があるらしい
function radioDeselection() {
    for (const reset of document.querySelectorAll('input[type="radio"]')) {
        reset.checked = false;
    }
}