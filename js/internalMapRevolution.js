/**
 * Created with JetBrains PhpStorm.
 * User: vfayos
 * Date: 27.06.13
 * Time: 15:08
 *
 * Javascript related to internal map revolution
 */


var InternalMapRevolution = {

    library: null,
    windowSpacemap: null,
    windowWebPage: null,
    isBlinking: false,
    intervalId: null,
    documentTitleDefault: Tools.Text.get("seo_title_standard"),


    /**
     *
     *
     * @constructor
     */
    Initialize: function () {


        this.fetchElements();
        this.initializeEventListeners();

    },

    fetchElements : function () {
    },

    initializeEventListeners : function () {

    },

    /**
     * blink parent tab
     * @param key
     */


    blinkHtmlTitle: function(key){

            var isOldTitle = true;
            var oldTitle = this.documentTitleDefault;
            var newTitle  = Tools.Text.get(key);
            var interval = null;

            function changeTitle() {
                window.opener.document.title = isOldTitle ? oldTitle : newTitle;
                isOldTitle = !isOldTitle;
            }

            this.intervalId = setInterval(changeTitle, 700);
//            console.log("new interval.. " + this.intervalId);

           //we remove anyway the blink after 12 seconds
            setTimeout(function(){
                InternalMapRevolution.clearCurrentInterval(InternalMapRevolution.intervalId)
            },12000);

            return this.intervalId;
    },


    /**
     *
     * Clear the current blink
     * (fallback for IE<10)
     * @param intervalId
     * @param documentTitleDefault
     */
    clearCurrentInterval: function(intervalId){

       clearInterval(intervalId);
       window.opener.document.title = InternalMapRevolution.documentTitleDefault;
       console.log("Auto cleanup... " + intervalId, "title " + window.opener.document.title);


    },


    /**
     * show the feedback form window
     * Enable in website a feedback form
     */

    showFeedbackForm: function (){

        this.referToURL("internalStart.es&ff=on", "seo_title_client", null, true, null);
        window.opener.focus();
    },

    /**
     * used by flash client to load urls into the website
     * Enable in website a feedback form
     */

    referToURL: function (action, key, tpl, focus, category, lootId, openIfNotOpened){

        if(action){
            var webUrl = "indexInternal.es"
            webUrl += "?action="+action;
            webUrl += (tpl)? "&tpl="+tpl:"";
            webUrl += (category)? "&category="+category:"";
            webUrl += (lootId)? "&lootId="+lootId:"";
        }

            var currentAction = jQuery('#actionFile').val();
            if (false == openIfNotOpened && action != currentAction) {
                return false;
            }

            switch(focus){

            case true:
                if (window.opener) {
//                    this.referOpenerToUrl(webUrl);

                } else if(document.isOpenSocial) {
                    showGame(document.webHost + '/' + webUrl + "&openSocial=1");
                }

            case false:

                if(window.opener){
                    window.opener.location.href = webUrl;
                }
                else if(document.isOpenSocial) {
                    showGame(document.webHost + '/' + webUrl + "&openSocial=1");
                }
            }

            //start blinking proces

            this.stopCurrentBlinking();

        if (key && ('undefined' != key || 'null' != key)) {
            this.blinkHtmlTitle(key);
        }
    },

    /**
     *
     * check if there is Peeper enable in the browser. returns true
     *
     * Peeper is a built-in implementation of Flash make by google who sucks.
     */
    detectPepper: function(){

        var isPPAPI = false;
        var type = 'application/x-shockwave-flash';
        var mimeTypes = navigator.mimeTypes;

        var endsWith = function(str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }

        if (mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin &&
            (mimeTypes[type].enabledPlugin.filename == "pepflashplayer.dll" ||
                mimeTypes[type].enabledPlugin.filename == "libpepflashplayer.so" ||
                endsWith(mimeTypes[type].enabledPlugin.filename, "Chrome.plugin"))){

            isPPAPI = true;
        }

        return isPPAPI;
    },

    stopCurrentBlinking: function(){

        if(this.intervalId != null){
//             console.log("removing... " + this.intervalId);
             clearInterval(this.intervalId);
             window.opener.document.title = this.documentTitleDefault;
        }

    },

    /**
     * open opener window and set focus on it
     * Enable in website a feedback form
     */

    referOpenerToUrl: function(webUrl){

        console.log("window.opener.name: " + window.opener.name);
        if(window.opener.name == "do_webpage") {

            if(this.windowWebPage == null){

                this.windowWebPage = window.open(webUrl, "do_webpage");

                var currentUrl = this.windowWebPage.location.pathname + this.windowWebPage.location.search;
                currentUrl  = currentUrl.substr(1); //remove first string "/"

                if (currentUrl != webUrl) {
                    this.windowWebPage.location.href =  webUrl;
                }
            }else if(this.windowWebPage.closed){
                this.windowWebPage = window.open(webUrl, "do_webpage");
            }else{
                var currentUrl = this.windowWebPage.location.pathname + this.windowWebPage.location.search;
                currentUrl  = currentUrl.substr(1); //remove first string "/"
                if (currentUrl != webUrl) {
                    this.windowWebPage.location.href =  webUrl;
                }
            }

            this.windowWebPage.focus();
        } else {
            window.opener.location.href =  webUrl;
            window.opener.focus();
        }

    },

    /**
     *
     *
     * Close child window if exists opener window
     *
     * @param reload
     */
    closeChildWindow: function (reload)
{
    if (window.opener) {
            if (reload){
                if (window.opener.location) {
                    window.opener.location.reload();
                }
            }
            window.close();
        } else {
            history.back();
        }
    }



};
