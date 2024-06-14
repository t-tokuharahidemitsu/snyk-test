const app = Vue.createApp({
  data() {
    return {
      currentStep: 1,
      qualification: [],
      workStyle: [],
      requestDate: "",
      zipCode: "",
      prefecture: "",
      city: "",
      name: "",
      tel: "",
      email: "",
      cities: [],
      addressData: {},
      errorMessages: {},
      touchedFields: {},

      qualifications: [
        {
          value: "介護福祉士",
          label: "介護福祉士",
          img: "img/btn-icon-qualification01.png",
        },
        {
          value: "初任者研修(ヘルパー2級)",
          label:
            '初任者研修<span class="qualification-small-txt">(ヘルパー2級)',
          img: "img/btn-icon-qualification02.png",
        },
        {
          value: "実務者研修(ヘルパー1級)",
          label:
            '実務者研修<span class="qualification-small-txt">(ヘルパー1級)',
          img: "img/btn-icon-qualification03.png",
        },
        {
          value: "介護支援専門員(ケアマネージャー)",
          label:
            '介護支援専門員<span class="qualification-small-txt">(ケアマネージャー)',
          img: "img/btn-icon-qualification04.png",
        },
        {
          value: "資格なし（介護職 経験有）",
          label:
            '資格なし<span class="qualification-small-txt">（介護職 経験有）',
          img: "img/btn-icon-qualification07.png",
        },
        {
          value: "資格なし（介護職 未経験）",
          label:
            '資格なし<span class="qualification-small-txt">（介護職 未経験）',
          img: "img/btn-icon-qualification08.png",
        },
        {
          value: "社会福祉士",
          label: "社会福祉士",
          img: "img/btn-icon-qualification05.png",
        },
        {
          value: "その他",
          label: "その他",
          img: "img/btn-icon-qualification06.png",
        },
      ],

      workStyles: [
        {
          value: "常勤（夜勤あり）",
          label: "常勤（夜勤あり）",
          img: "img/btn-icon-workstyle01.png",
        },
        {
          value: "常勤（夜勤なし）",
          label: "常勤（夜勤なし）",
          img: "img/btn-icon-workstyle02.png",
        },
        {
          value: "パート・アルバイト（夜勤あり）",
          label: "パート・アルバイト（夜勤あり）",
          img: "img/btn-icon-workstyle03.png",
        },
        {
          value: "パート・アルバイト（夜勤なし）",
          label: "パート・アルバイト（夜勤なし）",
          img: "img/btn-icon-workstyle04.png",
        },
        { value: "派遣", label: "派遣", img: "img/btn-icon-workstyle05.png" },
        {
          value: "こだわらない",
          label: "こだわらない",
          img: "img/btn-icon-workstyle06.png",
        },
      ],

      requestDates: [
        {
          value: "1ヶ月以内",
          label: "1ヶ月以内",
          img: "img/btn-icon-request-date01.png",
        },
        {
          value: "3ヶ月以内",
          label: "3ヶ月以内",
          img: "img/btn-icon-request-date02.png",
        },
        {
          value: "6ヶ月以内",
          label: "6ヶ月以内",
          img: "img/btn-icon-request-date03.png",
        },
        {
          value: "1年以内",
          label: "1年以内",
          img: "img/btn-icon-request-date04.png",
        },
        {
          value: "1年以上先",
          label: "1年以上先",
          img: "img/btn-icon-request-date05.png",
        },
        {
          value: "未定",
          label: "未定",
          img: "img/btn-icon-request-date06.png",
        },
      ],

      // 生まれ年リスト
      year: "1980/昭和55",
      years: Array.from({ length: 58 }, (_, i) => {
        const year = 1949 + i;
        if (year === 1989) {
          return `${year}/昭和64・平成1`;
        } else if (year >= 1990) {
          return `${year}/平成${year - 1988}`;
        } else {
          return `${year}/昭和${24 + i}`;
        }
      }),
    };
  },

  mounted() {
    // ポップアップ
    const closeButtons = document.querySelectorAll(".close-button");
    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const popup = document.querySelector(".lp_step_question_popup");
        if (popup) {
          popup.style.display = "none";
        }
      });
    });

    this.previousWorkStyleLength = 0;

    // 外部のaddress.jsファイルを読み込み
    this.addressData = address;
  },

  methods: {
    touchField(field) {
      if (!this.touchedFields[field]) {
        this.touchedFields[field] = true;
      }
      // フィールドがタッチされた時にバリデーションを実行
      this.validateField(field);
    },

    goToStep(step) {
      if (step > this.currentStep) {
        // 次のステップに進む場合はバリデーションを実行
        if (this.validateStep(this.currentStep)) {
          this.clearErrorMessages();
          this.currentStep = step;
          window.scrollTo(0, 0);
        }
      } else {
        // 前のステップに戻る場合はバリデーションをスキップ
        this.currentStep = step;
        window.scrollTo(0, 0);
      }
    },

    validateStep(step) {
      let isValid = true;
      if (step === 1) {
        isValid = this.validateField("qualification") && isValid;
      }
      if (step === 2) {
        isValid = this.validateField("workStyle") && isValid;
        isValid = this.validateField("requestDate") && isValid;
      }
      if (step === 3) {
        isValid = this.validateField("prefecture") && isValid;
        isValid = this.validateField("city") && isValid;
      }
      if (step === 4) {
        isValid = this.validateField("name") && isValid;
        isValid = this.validateField("year") && isValid;
      }
      if (step === 5) {
        isValid = this.validateField("tel") && isValid;
      }
      return isValid;
    },

    validateField(field) {
      let errorMessage = "";
      if (field === "qualification" && this.qualification.length === 0) {
        errorMessage = "保有資格は必須項目です";
      }
      if (field === "workStyle" && this.workStyle.length === 0) {
        errorMessage = "希望勤務形態は必須項目です";
      }
      if (field === "zipCode" && this.zipCode) {
        // 半角数字以外を除去
        this.zipCode = this.zipCode.replace(/[^0-9]/g, "");
        if (this.zipCode.length !== 7 || !/^\d{7}$/.test(this.zipCode)) {
          errorMessage = "郵便番号は7文字でなければなりません";
        }
      }
      if (field === "prefecture" && !this.prefecture) {
        errorMessage = "都道府県は必須項目です";
      }
      if (field === "city" && !this.city) {
        errorMessage = "市区町村は必須項目です";
      }
      if (field === "name" && !this.name) {
        errorMessage = "名前は必須項目です";
      }
      if (field === "tel") {
        // 半角数字以外を除去
        this.tel = this.tel.replace(/[^0-9]/g, "");
        if (!this.tel) {
          errorMessage = "電話番号は必須項目です";
        } else if (this.tel.length < 10) {
          errorMessage = "電話番号は10文字以上でなければなりません";
        } else if (this.tel.length > 11) {
          errorMessage = "電話番号は11文字以内にしてください";
        }
      }
      if (field === "email") {
        // 2文字以上の英字のトップレベルドメインが必要
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (this.email && !emailPattern.test(this.email)) {
          errorMessage = "メールアドレスは有効なメールアドレスではありません";
        }
      }
      // エラーメッセージを更新
      if (this.touchedFields[field]) {
        this.errorMessages[field] = errorMessage;
      }
      return errorMessage === "";
    },

    clearErrorMessages() {
      this.errorMessages = {};
    },

    transitionToStep2() {
      this.goToStep(2);
    },
    transitionToStep3() {
      this.goToStep(3);
    },
    transitionToStep4() {
      this.goToStep(4);
    },
    transitionToStep5() {
      this.goToStep(5);
    },

    // 1つチェックが入ったときにスクロール
    scrollToRequestDate() {
      if (this.workStyle.length === 1 && !this.previousWorkStyleLength) {
        const element = document.getElementById("back2");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      }
      this.previousWorkStyleLength = this.workStyle.length;
    },

    onChangeZipCode() {
      // ハイフンを削除して正規化
      const zipcode = this.zipCode.replace(/-/g, "");
      // 未入力の場合はエラーメッセージをクリア
      if (!zipcode) {
        this.errorMessages.zipCode = "";
        return;
      }
      // 7文字の郵便番号が入力されたらエラーメッセージをクリア
      if (this.validateField("zipCode")) {
        fetch(`https://api.zipaddress.net/?zipcode=${zipcode}`, {
          mode: "cors",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.code === 200) {
              // 都道府県をセット
              this.prefecture = data.data.pref;
              // 市区町村を更新
              this.cities = this.addressData[this.prefecture] || [];
              // 市区町村をセット
              this.city = data.data.city;
              // エラーメッセージをクリア
              this.errorMessages.zipCode = "";
            } else {
              this.errorMessages.zipCode =
                "指定された郵便番号に対応する住所が見つかりません。";
            }
          })
          .catch((error) => {
            this.errorMessages.zipCode =
              "住所情報の取得中にエラーが発生しました。";
          });
      }
    },

    onChangePrefecture() {
      if (this.prefecture) {
        this.cities = this.addressData[this.prefecture] || [];
        this.city = "";
      } else {
        this.cities = [];
      }
    },

    handleQualificationChange() {
      this.touchField("qualification");
      this.validateField("qualification");
      this.transitionToStep2();
    },
    handleWorkStyleChange() {
      this.touchField("workStyle");
      this.validateField("workStyle");
      this.scrollToRequestDate();
    },
    handleRequestDateChange() {
      this.touchField("requestDate");
      this.validateField("requestDate");
      this.transitionToStep3();
    },
    handlePrefectureChange() {
      this.touchField("prefecture");
      this.validateField("prefecture");
      this.onChangePrefecture();
    },
    handleCityChange() {
      this.touchField("city");
      this.validateField("city");
      this.transitionToStep4();
    },
    handleNameChange() {
      this.touchField("name");
      this.validateField("name");
    },
    handleYearChange() {
      this.touchField("year");
      this.validateField("year");
      this.transitionToStep5();
    },
    handleTelChange() {
      this.touchField("tel");
      this.validateField("tel");
    },
    handleEmailChange() {
      this.touchField("email");
      this.validateField("email");
    },
  },

  // 変更を監視してエラーメッセージをリアルタイムで更新
  watch: {
    qualification() {
      this.touchField("qualification");
    },
    workStyle() {
      this.touchField("workStyle");
    },
    requestDate() {
      this.touchField("requestDate");
    },
    zipCode() {
      this.touchField("zipCode");
      this.onChangeZipCode();
    },
    prefecture() {
      this.touchField("prefecture");
    },
    city() {
      this.touchField("city");
    },
    name() {
      this.touchField("name");
    },
    year() {
      this.touchField("year");
    },
    tel() {
      this.touchField("tel");
    },
    email() {
      this.touchField("email");
    },
  },
});

app.mount("#step-form");
