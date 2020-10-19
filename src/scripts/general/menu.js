import $ from 'jquery';
import { isMobile } from '../utils/utils';

export default function Menu() {
    const oceano = {
      init: () => {
          $(document).ready(function(){
            oceano.ready();
          }); 
      },

      ready: () => {
        oceano.menuCount()
        oceano.menuMouseleave();
        oceano.mobileMenu();
        oceano.onResize()
      },

      onResize: () => {
        $(window).on('resize', function () {
          oceano.mobileMenu();
        })
      },

      menuCount: () => {
        const $parent = $('.header__menu');
        const $menuBtn = $('.header__menu__btn');
        const $wrapper = $('.header__menu__content');

        const lengthWrapper = $wrapper.find('li').length;
        const wrapEach = 5;
        const divs = $wrapper.find('li');

        if ( lengthWrapper > wrapEach ) {
          for(var i = 0; i < lengthWrapper; i+=wrapEach) {
            divs.slice(i, i+wrapEach).wrapAll("<div class='wrapperEach' />");
          }
        } else {
          $wrapper.find('li').each(function (el) {
          }).wrapAll("<div class='wrapperEach' />");
        }
      },

      mobileMenu: () => {
        const mobileSize = '768px';
        const $menu = $('.header__menu');
        const $menuMobile = $('.header__links');
        const wrapperContent = $('.header__menu__content').html();

        if ( isMobile(mobileSize) ) {
          $menuMobile.length == 0 && $(`<ul class="header__links header__links--courses"><li class="title"><a>Nuestros cursos</a></li><ul>${wrapperContent}</ul></ul>`).insertAfter($menu)
        } else {
          $menuMobile.length > 0 && $menuMobile.remove()
        }
      },

      menuMouseleave : () => {
        const $parent = $('.header__menu');
        const $menu = $('.header');

        $menu.mouseleave(function() {
          if ( $parent.hasClass('active') ) {
            $parent.toggleClass('active');
          }
        });
      }
      
    };

    oceano.init();

};
Menu();
