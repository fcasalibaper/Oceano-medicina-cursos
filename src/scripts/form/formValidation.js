import $ from 'jquery';

export default function FormValidation() {
  const oceanoForm = {
    init : () => {
      $(document).ready(function() {
        oceanoForm.ready()
      })
    },

    ready : () => {
      oceanoForm.formValidation.init();
      oceanoForm.selectCustom.init();
    },

    selectCustom : {
      init: () => {
        oceanoForm.selectCustom.clickButton();
        oceanoForm.selectCustom.initValues();
        oceanoForm.selectCustom.closeMouseLeave();
      },

      initValues : () => {
        const $all = $('.custom-select-wrapper');

        $all.each( function () {
          const $el = $(this).find('.custom-option.selected');
          oceanoForm.selectCustom.setNewData($el);
        })
      },

      clickButton : () => {
        $(".custom-select-wrapper").on('click', function() {
          $(this).find('.custom-select').toggleClass('open');
        });
        $('.custom-options').on('click', 'span', function() {
          const data = $(this);
          oceanoForm.selectCustom.setNewData(data)
        });
      },

      closeMouseLeave : () => {
        const $mouseAction = $('.custom-select-wrapper');

        $mouseAction.on('mouseleave', '.custom-select.open', function () {
          $(this).toggleClass('open');
        }) 
      },

      setNewData : ( el ) => {
        if ( !$('.custom-options').hasClass('selected') ) {
          const selectedData = el;
          const $elementToChange = selectedData.parent().siblings('.custom-select__trigger');

          // prrint values 
          $elementToChange.find('span').html(selectedData.html());
          $elementToChange.find('input').val(selectedData.text());

          // states 
          selectedData.siblings().removeClass('selected')
          selectedData.addClass('selected');
          
          // remove initial plcaholder
          oceanoForm.selectCustom.removePlaceholder($elementToChange.find('span'))
        }
      }, 

      removePlaceholder : (elPlaceholder) => {
        if (elPlaceholder.hasClass('placeholder')) {
          elPlaceholder.removeClass('placeholder')
        }
      }
    },

    formValidation : {
      init : () => {
          oceanoForm.formValidation.validateForm();
          oceanoForm.formValidation.inpurCounterLimit();
      },
      validateForm : () => {
          var forms = $('.needs-validation');
          Array.prototype.filter.call(forms, function(form) {
              form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
              }, false);
          });
      },

      inpurCounterLimit : () => {
          // add a span tag to display the counter
          $(".post_title").prev("label").children(".adverts-form-required").after("<span class=\"title-counter\">22</span>");

          // add an input length limit
          $(".post_title").keydown(function(){
              if(this.value.length > 22){
                  return false;
              }
              $(".title-counter").html(+(22 - this.value.length));
          });
      }
    }
  }

  oceanoForm.init()
}
FormValidation()