import sidebarHTML from './sidebar.html';

const adblockImg = [
    'https://sun9-4.userapi.com/impf/c637716/v637716825/2bb1a/RSRw-9ycNXw.jpg?size=162x215&quality=96&sign=eaad772f5254265f9b0f114a3e9081ff&c_uniq_tag=Ql9hibbZhmuq7WFfVR92C7F5BtIHC1C_Vvph77-dCg0&type=album',
    'https://sun9-6.userapi.com/impf/c3JX0VraHkluPMgJywKsBrm6zNSLm82Mcb_Bgw/OF3AYFcFsGs.jpg?size=269x156&quality=96&sign=1465fe09b6169e9b6d4a4dba4ea99d56&c_uniq_tag=Dv7YqK6o8SwqH3TQ33e_VBPuctc7JDsguO4L7dIBSaU&type=album',
    'https://sun9-20.userapi.com/impf/c630223/v630223945/4189d/mae5SCvOnC4.jpg?size=147x209&quality=96&sign=a0cc190ba932060ac18b08431fd7824d&c_uniq_tag=vyeYXd74JNzVptozF0skRSP9uSHknhTRfX1gRG01-V4&type=album',
    'https://sun9-2.userapi.com/impf/c636920/v636920720/20f8/Ug5z12zQdfk.jpg?size=366x97&quality=96&sign=303fb75da8daaaf59ec99b93d4a9c9a7&c_uniq_tag=mJXRy5KAHpTOpjN1qcWn8J5oTmcoKmdvtmZPnhfA4TA&type=album',
    'https://sun9-1.userapi.com/impf/c630124/v630124788/39733/bj4kbboH3RQ.jpg?size=617x695&quality=96&sign=7f3fc8f47b29a5dfa5938d922adef026&c_uniq_tag=BYoHvk31U93BAuJ5PrQh1S-lkn-AEStK2Ub8twkM_ic&type=album',
    'https://sun9-23.userapi.com/impf/c604420/v604420519/1736f/Bqgk4DYOLoo.jpg?size=454x807&quality=96&sign=8821bce442b8173a005d1efbfc9d0c3c&c_uniq_tag=-U6pb11BQ-tdjfCHEtJNo1AcrPsjOooNwFI_0sMUZrE&type=album',
    'https://sun9-20.userapi.com/impf/c633919/v633919926/2544c/MoWMT7bmxWI.jpg?size=217x289&quality=96&sign=a7294b6af24236e415516f6601300279&c_uniq_tag=aDsa999Ki-amodiiybrQOZZSoVu2JVU3FM3MTq-ALsg&type=album',
    'https://sun9-26.userapi.com/impf/c627720/v627720485/3f2ef/1oH1Ap3XRYk.jpg?size=199x304&quality=96&sign=66bad2192391bfed5728bffda80977b6&c_uniq_tag=gO81PMYQef40o8KRyfmApHSY_eUC94tk3WaptDU8JZc&type=album',
    'https://sun9-39.userapi.com/impf/c625831/v625831137/5a3bc/irt3POdwa_Y.jpg?size=121x167&quality=96&sign=de16c239b4472e378ee950b31ecabc75&c_uniq_tag=40ee2HZtnSTFXzLw0EDS_89DV6MOew6O5sxBI2BO-nU&type=album',
    'https://sun9-64.userapi.com/impf/c633430/v633430060/1303f/tll0QcPYCfQ.jpg?size=240x278&quality=96&sign=3193c4a88cb522f55bd6836d711e15d9&c_uniq_tag=am1WNBEs0VSAgu1cxgAUmccrZF_xPqXYCHHTLAmd_KQ&type=album',
    'https://sun9-13.userapi.com/impf/c631220/v631220565/eac1/X4i_ESN1tGQ.jpg?size=640x437&quality=96&sign=b7e2ffc26799259aedeca84b832762a8&c_uniq_tag=_v_3UfdwA96aiJO2q6Lg-jNrQ97ayhkyWPr6qLPgLIQ&type=album',
    'https://sun9-10.userapi.com/impf/c630720/v630720118/1445f/tAsRbugCwCo.jpg?size=755x321&quality=96&sign=5569223e98dded14be45eaca1247b979&c_uniq_tag=zxRtZGVDVHObB_FkQzRPhZYrwNsSGMZDuF6nQbcKifg&type=album',
    'https://sun9-73.userapi.com/impf/c633221/v633221247/419b/GmLoRf1pIko.jpg?size=141x188&quality=96&sign=442462ca39095fcc131805c6a03023f4&c_uniq_tag=N6R4DrmqByZUwe7SOSOArwmvToQn9Nb1XP4fxUBEdW8&type=album',
    'https://sun9-19.userapi.com/impf/c633120/v633120952/5c89/1BPSBsejvqc.jpg?size=324x380&quality=96&sign=2f1c4ba12a35b33b9d4b68e5912df686&c_uniq_tag=uxE0LhDnlktMKrAniyDQkDAhnOs4EGT_OuREqxgzK00&type=album',
    'https://sun9-61.userapi.com/impf/c633221/v633221812/5900/i5hz1U-2qb8.jpg?size=250x254&quality=96&sign=b15fa9396b07588520d86b287a188848&c_uniq_tag=tt6-kJ7oGdXPsG-cKbAjLSnFRxWag6TtsQsl5S4dkqE&type=album',
    'https://sun9-54.userapi.com/impf/c633221/v633221247/4194/TbTYhXSzGuI.jpg?size=128x181&quality=96&sign=0820f10f8bd58cad6f80b54d15c7292a&c_uniq_tag=eLZpmVPiPfPkMXKtjCsYC5ezJzOjBsEluOpw41MNgcE&type=album',
    'https://sun9-13.userapi.com/impf/c627921/v627921247/23358/GpJHURhyhlI.jpg?size=143x189&quality=96&sign=8b8b5b36d8de6c375a8a25976e18936f&c_uniq_tag=qvYFSWUxAWwGQjNreG0iUQV2tLe-RohVIUnaLmVBfPY&type=album',
    'https://sun9-65.userapi.com/impf/c625420/v625420837/30325/2-MXF7HN4zU.jpg?size=240x374&quality=96&sign=f789d38e4c2d0c685547d068cc6982cb&c_uniq_tag=Fp-5StAF9zVOfFCODimKOXl0hGCgnuYOmyMH_yZmyFg&type=album',
    'https://sun9-65.userapi.com/impf/c628724/v628724503/22b98/dEcyxYBTsuQ.jpg?size=117x187&quality=96&sign=eee6d050d03964769bb5083e24a9afd6&c_uniq_tag=_Pmr49536hIGBiuJ4Wh6q6ZDngYNJjx0GHrWE8DkYVQ&type=album',
    'https://sun9-31.userapi.com/impf/c628219/v628219969/1de86/ryGz8orHFzs.jpg?size=148x168&quality=96&sign=d845b522665fe648cb2f317517158487&c_uniq_tag=AjphgyTOfp-IMMxj_CjRYcZWuqHOsJHJDEQNKHm01cs&type=album',
    'https://sun9-51.userapi.com/impf/c628126/v628126848/1cb21/mnhJsIvE8W8.jpg?size=201x220&quality=96&sign=837f02e5f1340d6aa60a7a598609ce2f&c_uniq_tag=HcymTSDIy30rLD0Crg0fvn9WvGq4uZbMHRAFdHFB3iA&type=album',
    'https://sun9-74.userapi.com/impf/c622621/v622621764/4d21b/EkOv6zBFZOI.jpg?size=601x249&quality=96&sign=c45f40a012f3c842604372b3fe8a9668&c_uniq_tag=jCklI5d3FKINQcUPp4-oajvvZ-Z1EKWtwtu-4jJ01sk&type=album',
];

export class Sidebar {
    private _view: HTMLElement;

    constructor(root: HTMLElement) {
        root.innerHTML = sidebarHTML;
        this._view = document.getElementById('sidebar');
    }

    render() {
        this.clear();

        for (let i = 0; i < 5; i++) {
            this._view.innerHTML += `<a class="sidebar__item" target="_blank" href="https://t.me/Dark_AndrewFOX"><img class="sidebar__item" alt="реклама" src="${ adblockImg[Math.floor(Math.random() * (adblockImg.length))] }"></a>`;
        }
    }

    clear() {
        this._view.innerHTML = '';
    }
}