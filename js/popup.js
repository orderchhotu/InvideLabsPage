  /**
   * This javascript file checks for the brower/browser tab action.
   * It is based on the file menstioned by Daniel Melo.
   * Reference: http://stackoverflow.com/questions/1921941/close-kill-the-session-when-the-browser-or-tab-is-closed
   */
  console.log(sessionStorage.getItem('sessionModal'));
  var ifSubscribed = document.cookie == 'subscribed=true' ? true : false;
  var showModal = (sessionStorage.getItem('sessionModal') == null && !ifSubscribed) ? true : false;
  var validNavigation = false;
  var elemId = 'show-popup-view';
  if ($('#' + elemId).length) {
      var elemOffsetTop = $('#' + elemId).offset().top;
  }


  var showOnClose = false;
  var showOnScroll = false;
  var showOnTimeout = true;
  var showOnElemVisibility = false;
  var timeoutDuration = 150000;
  var totalScrollHeight = document.getElementsByTagName('body')[0].scrollHeight;

  if (showOnScroll && showModal) {
      window.addEventListener('scroll', function(e) {
          if (this.scrollY > (totalScrollHeight / 2) && showModal) {
              showModal = false;
              modal.open();
          }
      })
  }


  if (showOnElemVisibility && showModal) {
      window.addEventListener('scroll', function(e) {
          if (this.scrollY > elemOffsetTop && showModal) {
              showModal = false;
              modal.open();
          }
      })
  }

  if (showOnTimeout && showModal) {
      var timeout = setTimeout(function() {
          modal.open();
      }, timeoutDuration);
  }


  function wireUpEvents() {
      /**
       * For a list of events that triggers onbeforeunload on IE
       * check http://msdn.microsoft.com/en-us/library/ms536907(VS.85).aspx
       *
       * onbeforeunload for IE and chrome
       * check http://stackoverflow.com/questions/1802930/setting-onbeforeunload-on-body-element-in-chrome-and-ie-using-jquery
       */
      var dont_confirm_leave = 0; //set dont_confirm_leave to 1 when you want the user to be able to leave without confirmation
      var leave_message = 'Do you really want to close?'

      function goodbye(e) {
          if (!validNavigation) {
              if (dont_confirm_leave !== 1) {
                  if (!e) e = window.event;
                  //e.cancelBubble is supported by IE - this will kill the bubbling process.
                  e.cancelBubble = true;
                  e.returnValue = leave_message;
                  //e.stopPropagation works in Firefox.
                  if (e.stopPropagation) {
                      e.stopPropagation();
                      e.preventDefault();
                  }
                  console.log('event', e);
                  modal.open();
                  return leave_message;
              }
          }
      }
      window.addEventListener('beforeunload', function() {
          goodbye();
      });
  }

  // Attach the event keypress to exclude the F5 refresh
  $(document).bind('keypress', function(e) {
      if (e.keyCode == 116) {
          validNavigation = true;
      }
  });

  // Attach the event click for all links in the page
  $("a").bind("click", function() {
      validNavigation = true;
  });

  // Attach the event submit for all forms in the page
  $("form").bind("submit", function() {
      validNavigation = true;
  });

  // Attach the event click for all inputs in the page
  $("input[type=submit]").bind("click", function() {
      validNavigation = true;
  });


  $(document).ready(function() {
      if (showOnClose) {
          wireUpEvents();
      }
  });

  // Wire up the events as soon as the DOM tree is ready


  var modal = new tingle.modal({
      footer: false,
      closeMethods: ['overlay', 'button', 'escape'],
      closeLabel: "Close",
      cssClass: ['custom-class-1', 'custom-class-2'],
      onOpen: function() {
          console.log('modal open');
      },
      onClose: function() {
          console.log('modal closed');
          sessionStorage.setItem('sessionModal', false);
          showModal = false;
      },
      beforeClose: function() {
          // here's goes some logic
          // e.g. save content before closing the modal
          return true; // close the modal
      }
  });


  var popupHtml = '<div class="popup-heading">Be the first one to hear about the latest updates</div><div class="share-email-wrapper" style="margin-bottom: 20px;"><form method="POST" id="zcampaignOptinForm" action="https://zcs1.maillist-manage.com/campaigns/weboptin.zc" target="_zcSignup" onsubmit="saveSubscriptionCookie()"><input name="CONTACT_EMAIL" changetype="CONTACT_EMAIL" changeitem="SIGNUP_FORM_FIELD" type="email" required="true" id="CONTACT_EMAIL" class="form-control il-input" placeholder="Share your email"><button class="btn btn-danger rounded-0 btn-lg btn-hire-expert" name="SIGNUP_SUBMIT_BUTTON" id="zcWebOptin" type="submit">Subscribe</button><input type="hidden" id="fieldBorder" value="rgb(235, 235, 235)"><input type="hidden" id="submitType" name="submitType" value="optinCustomView"><input type="hidden" id="lD" name="lD" value="139e6261a7c7df39"><input type="hidden" name="emailReportId" id="emailReportId" value=""><input type="hidden" id="formType" name="formType" value="QuickForm"><input type="hidden" name="zx" id="cmpZuid" value="123bfa3b5"><input type="hidden" name="zcvers" value="2.0"><input type="hidden" name="oldListIds" id="allCheckedListIds" value=""><input type="hidden" id="mode" name="mode" value="OptinCreateView"><input type="hidden" id="zcld" name="zcld" value="139e6261a7c7df39"><input type="hidden" id="document_domain" value="zoho.com"><input type="hidden" id="zc_Url" value="zcs1.maillist-manage.com"><input type="hidden" id="new_optin_response_in" value="1"><input type="hidden" id="duplicate_optin_response_in" value="1"><input type="hidden" name="zc_trackCode" id="zc_trackCode" value="" onload=""><input type="hidden" id="zc_formIx" name="zc_formIx" value="eda160ea23c299e200698eb654dc9a26bed815d63f8e906a"><input type="hidden" id="scriptless" name="scriptless" value="yes"></form></div><span style="font-size: 12px; cursor: pointer; position: absolute; right: 10px; bottom: 10px; color: #616161;" onClick="modal.close()">No thanks</span>';

  var eventSubscribeHtml = '<div class="share-email-wrapper" style="margin-bottom: 20px"><form method="POST" id="zcampaignOptinForm" action="https://zc1.maillist-manage.in/weboptin.zc" target="_zcSignup" onsubmit="saveSubscriptionCookie()"><input name="CONTACT_EMAIL" changetype="CONTACT_EMAIL" changeitem="SIGNUP_FORM_FIELD" type="email" required="true" id="CONTACT_EMAIL" class="form-control il-input" placeholder="Your email"><button class="btn btn-danger rounded-0 btn-lg btn-hire-expert" name="SIGNUP_SUBMIT_BUTTON" id="zcWebOptin" type="submit">Commit To Join</button><input type="hidden" id="fieldBorder" value="rgb(235, 235, 235)">        <input type="hidden" name="zc_trackCode" id="zc_trackCode" value="ZCFORMVIEW" onload="">        <input type="hidden" id="submitType" name="submitType" value="optinCustomView">        <input type="hidden" id="lD" name="lD" value="1243591eb8d2ee1">        <input type="hidden" name="emailReportId" id="emailReportId" value="">        <input type="hidden" id="formType" name="formType" value="QuickForm">        <input type="hidden" name="zx" id="cmpZuid" value="1df85d1200">        <input type="hidden" name="zcvers" value="3.0">        <input type="hidden" name="oldListIds" id="allCheckedListIds" value="">        <input type="hidden" id="mode" name="mode" value="OptinCreateView">        <input type="hidden" id="zcld" name="zcld" value="1243591eb8d2ee1">        <input type="hidden" id="document_domain" value="campaigns.zoho.com">        <input type="hidden" id="zc_Url" value="zc1.maillist-manage.in">        <input type="hidden" id="new_optin_response_in" value="0">        <input type="hidden" id="duplicate_optin_response_in" value="0">        <input type="hidden" id="zc_formIx" name="zc_formIx" value="675bd6a69048647d26204af80c84579dd71b62c3142be692"><input type="hidden" id="scriptless" name="scriptless" value="yes"></form></div>'
  var eventPopupHtml = '<div class="popup-heading">Git Commit Show</div><h2>Largest online developer conference</h2><h3> Jun 27-28 | Online | Free</h3>' + eventSubscribeHtml + '<span style="font-size: 12px; cursor: pointer; position: absolute; right: 10px; bottom: 10px; color: #616161;" onClick="modal.close()">No thanks</span>';

  var currentDateC = new Date();
  var eventDateC = new Date('2020-07-07');
  if (currentDateC.getTime() < eventDateC.getTime()) {
      popupHtml = eventPopupHtml;
      console.log("Event Registration Prompt : ON");
  }

  // set content
  modal.setContent(popupHtml);

  function saveSubscriptionCookie() {
      var today = new Date();
      var expiry = new Date(today.getTime() + 365 * 24 * 3600 * 1000);
      document.cookie = "subscribed=" + escape('true') + "; path=/; expires=" + expiry.toGMTString();
      modal.close();
      return true;
  }