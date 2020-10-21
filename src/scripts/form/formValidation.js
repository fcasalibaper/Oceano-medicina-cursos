import $ from 'jquery';

export default function FormValidation() {
  let titles = [];
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
        oceanoForm.selectCustom.closeOutside();
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

        $(".custom-select-wrapper").on('click touchstart', function(e) {
          const $select = $(this).find('.custom-select');
          if( !$(this).hasClass('custom-select-wrapper--multi') ) {
            $select.toggleClass('open');
          } else {
            !$select.hasClass('open') && $select.addClass('open');
          }
        });

        $('.custom-options').on('click touchstart', 'span', function(e) {
          const data = $(this);
          const parent = data.parent();
          e.stopPropagation()

          !parent.hasClass('custom-options--multi') ? oceanoForm.selectCustom.setNewData(data) : oceanoForm.selectCustom.setNewDataMulti(data);
          return false
        });
      },

      closeOutside: () => {
        const $coursesSelected = $('ul.listCourses');

        $coursesSelected.on('click touchstart','li', function () {
          const text = $(this).text();
          $(`span.custom-option[rel="${text}"]`).trigger('click');
          return false
        })
      },

      closeMouseLeave : () => {
        const $mouseAction = $('.custom-select-wrapper--single');
        const $mouseActionMulti = $('.custom-select-wrapper--multi');

        $mouseAction.on('mouseleave touchend', function () {
          $(this).find('.custom-select').hasClass('open') && $(this).find('.custom-select').removeClass('open');
        });

        $mouseActionMulti.add('.coursesSelected').on('mouseleave touchstart', function () {
          $(this).find('.custom-select').hasClass('open') && $(this).find('.custom-select').removeClass('open');
        });
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

      setNewDataMulti : ( el ) => {
        const selectedData = el;
        const $elementToChange = selectedData.parent().siblings('.custom-select__trigger');

        if (!el.hasClass('selected')) {
          titles.push(el.text());
        } else {
          const filteredItems = titles.filter(function(item) {
            titles = [];
            return item !== el.text()
          })
          titles.push(...filteredItems);
        }
        let separator = titles.length > 0 ? titles.reduce((acc,el) => {
          return `${acc}, ${el}`
        }) : 'Cursos de Interés';

        // prrint values 
        $elementToChange.find('span').html(separator);
        $elementToChange.find('input').val(separator);
        

        const all = titles.map(function (element) {
          return $(`<li>${element}</li>`)
        })

        $('.coursesSelected').html(`<ul><li class="title">Cursos seleccionados</li><ul><ul class="listCourses"></ul>`)
        
        $('.listCourses').append(all);

        if ( !$('.custom-options').hasClass('selected') ) {
          // states 
          selectedData.toggleClass('selected');
          
          // remove initial plcaholder
          oceanoForm.selectCustom.removePlaceholder($elementToChange.find('span'))
          oceanoForm.selectCustom.closeOutside();
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