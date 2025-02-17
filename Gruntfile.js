module.exports = function(grunt) {
	var flagsIsoCodes = {
			'_England':'eng',
			'_Wales':'wal',
			'_Quebec':'qbc',
			'_Scotland':'sco',
			'_Northern-Ireland':'nir',
			'_Northern-Cyprus':'ncy',
			'_Galicia':'glc',
			'af':'afg',
			'ax':'ala',
			'al':'alb',
			'dz':'alg',
			'as':'asm',
			'ad':'and',
			'ao':'ago',
			'ai':'aia',
			'aq':'ata',
			'ag':'atg',
			'ar':'arg',
			'am':'arm',
			'aw':'abw',
			'au':'aus',
			'at':'aut',
			'az':'aze',
			'bs':'bah',
			'bh':'bhr',
			'bd':'ban',
			'bb':'brb',
			'by':'blr',
			'be':'bel',
			'bz':'blz',
			'bq':'bes',
			'bj':'ben',
			'bm':'bmu',
			'bt':'bhu',
			'bo':'bol',
			'ba':'bih',
			'bw':'bot',
			'bv':'bvt',
			'br':'bra',
			'vg':'vgb',
			'io':'iot',
			'bn':'bru',
			'bg':'bul',
			'bf':'bfa',
			'bi':'bdi',
			'kh':'cam',
			'cm':'cmr',
			'ca':'can',
			'cv':'cpv',
			'ky':'cym',
			'cf':'cta',
			'td':'cha',
			'cl':'chi',
			'cn':'chn',
			'hk':'hkg',
			'mo':'mac',
			'cx':'cxr',
			'cc':'cck',
			'co':'col',
			'km':'com',
			'cg':'cgo',
			'cd':'zai',
			'ck':'cok',
			'cr':'crc',
			'ci':'civ',
			'hr':'cro',
			'cu':'cub',
			'cy':'cyp',
			'cw':'cuw',
			'cz':'cze',
			'dk':'den',
			'dj':'dji',
			'dm':'dma',
			'do':'dom',
			'ec':'ecu',
			'eg':'egy',
			'sv':'slv',
			'gq':'eqg',
			'er':'eri',
			'ee':'est',
			'et':'eth',
			'fk':'flk',
			'fo':'fro',
			'fj':'fij',
			'fi':'fin',
			'fr':'fra',
			'gf':'guf',
			'pf':'pyf',
			'tf':'atf',
			'ga':'gab',
			'gm':'gam',
			'ge':'geo',
			'de':'ger',
			'gh':'gha',
			'gi':'gib',
			'gr':'gre',
			'gl':'grl',
			'gd':'grn',
			'gp':'glp',
			'gu':'gum',
			'gt':'gua',
			'gg':'ggy',
			'gn':'gin',
			'gw':'gnb',
			'gy':'guy',
			'ht':'hai',
			'hm':'hmd',
			'va':'vat',
			'hn':'hon',
			'hu':'hun',
			'is':'isl',
			'in':'ind',
			'id':'idn',
			'ir':'irn',
			'iq':'irq',
			'ie':'irl',
			'im':'imn',
			'il':'isr',
			'it':'ita',
			'jm':'jam',
			'jp':'jpn',
			'je':'jey',
			'jo':'jor',
			'kz':'kaz',
			'ke':'ken',
			'ki':'kir',
			'kp':'prk',
			'kr':'kor',
			'kw':'kwt',
			'kg':'kgz',
			'la':'lao',
			'lv':'lva',
			'lb':'lbn',
			'ls':'les',
			'lr':'lbr',
			'ly':'lby',
			'li':'lie',
			'lt':'ltu',
			'lu':'lux',
			'mk':'mkd',
			'mg':'mad',
			'mw':'mwi',
			'my':'mas',
			'mv':'mdv',
			'ml':'mli',
			'mt':'mlt',
			'mh':'mhl',
			'mq':'mtq',
			'mr':'mtn',
			'mu':'mri',
			'yt':'myt',
			'mx':'mex',
			'fm':'fsm',
			'md':'mda',
			'mc':'mon',
			'mn':'mng',
			'me':'mne',
			'ms':'msr',
			'ma':'mar',
			'mz':'moz',
			'mm':'mya',
			'na':'nam',
			'nr':'nru',
			'np':'nep',
			'nl':'ned',
			'an':'ant',
			'nc':'ncl',
			'nz':'nzl',
			'ni':'nca',
			'ne':'nig',
			'ng':'nga',
			'nu':'niu',
			'nf':'nfk',
			'mp':'mnp',
			'no':'nor',
			'om':'oma',
			'pk':'pak',
			'pw':'plw',
			'ps':'pse',
			'pa':'pan',
			'pg':'png',
			'py':'par',
			'pe':'per',
			'ph':'phi',
			'pn':'pcn',
			'pl':'pol',
			'pt':'por',
			'pr':'pri',
			'qa':'qat',
			're':'reu',
			'ro':'rou',
			'ru':'rus',
			'rw':'rwa',
			'bl':'blm',
			'sh':'shn',
			'kn':'sol',
			'lc':'lca',
			'mf':'maf',
			'pm':'spm',
			'vc':'vin',
			'ws':'sam',
			'sm':'smr',
			'st':'stp',
			'sa':'ksa',
			'sn':'sen',
			'rs':'srb',
			'sc':'sey',
			'sl':'sle',
			'sg':'sin',
			'sk':'svk',
			'si':'svn',
			'sb':'slb',
			'so':'som',
			'za':'zaf',
			'gs':'sgs',
			'ss':'ssd',
			'sx':'sxm',
			'es':'esp',
			'lk':'sri',
			'sd':'sdn',
			'sr':'sur',
			'sj':'sjm',
			'sz':'swz',
			'se':'swe',
			'ch':'sui',
			'sy':'syr',
			'tw':'twn',
			'tj':'tjk',
			'tz':'tza',
			'th':'tha',
			'tl':'tls',
			'tg':'tgo',
			'tk':'tkl',
			'to':'tga',
			'tt':'tri',
			'tn':'tun',
			'tr':'tur',
			'tm':'tkm',
			'tc':'tca',
			'tv':'tuv',
			'ug':'uga',
			'ua':'ukr',
			'ae':'uae',
			'gb':'gbr',
			'us':'usa',
			'um':'umi',
			'uy':'uru',
			'uz':'uzb',
			'vu':'van',
			've':'ven',
			'vn':'vie',
			'vi':'vir',
			'wf':'wlf',
			'eh':'esh',
			'ye':'yem',
			'zm':'zmb',
			'zw':'zwe',
			'yug':'yug',
			'xue':'xue',
			'xuh':'xuh',
			'xss':'xss',
			'xsa':'xsa'
	};

	grunt.initConfig({
		bower: {
			installAdmin: {
				options: {
					targetDir: 'www/adminwww/lib/vendor',
					layout: 'byType',
					install: true,
					verbose: false,
					cleanTargetDir: true,
					cleanBowerDir: true,
					bowerOptions: {
 						forceLatest: true
					}
				}
			}
		},
		uglify: {
			admin: {
				options: {
					mangle:false,
					compress: {},
					beautify: true,
					sourceMap: false,
					preserveComments: true
				},
				files: [
					{
					'www/adminwww/js/js.min.js' : [
						'www/adminwww/lib/others/excanvas.min.js',
						'www/adminwww/lib/vendor/jquery/jquery.js',
						'www/adminwww/lib/vendor/jquery-ui/jquery-ui.js',
						'www/adminwww/lib/vendor/jquery.gritter/jquery.gritter.js',
						'www/adminwww/lib/vendor/jquery-mousewheel/jquery.mousewheel.js',
						'www/adminwww/lib/vendor/jquery.nicescroll/jquery.nicescroll.js',
						'www/adminwww/lib/vendor/multiple-select/jquery.multiple.select.js',
						'www/adminwww/lib/vendor/jquery.inputmask/jquery.inputmask.js',
						'www/adminwww/lib/vendor/bootstrap/bootstrap.js',
						'www/adminwww/lib/vendor/mjolnic-bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js',
						'www/adminwww/lib/others/bootbox.min.js',
						'www/adminwww/lib/others/unicorn.js',
						'www/adminwww/lib/others/datetimepicker.js',
						'www/adminwww/lib/vendor/nette-forms/netteForms.js',
						'www/adminwww/lib/vendor/nette.ajax.js/nette.ajax.js',
						'www/adminwww/lib/others/dateInput.js',
						'www/adminwww/lib/vendor/typeahead.js/typeahead.bundle.js',
						'www/adminwww/lib/vendor/nprogress/nprogress.js',
						'www/adminwww/lib/others/nette.nprogress.js',
						'vendor/o5/grido/client-side/js/grido.js',
						'vendor/esports/grido-editable-extension/src/assets/editable.grido.js',
						'vendor/esports/grido-editable-extension/src/assets/grido.nette.ajax.js',
						'vendor/o5/grido/client-side/js/plugins/grido.typeahead.js',
						'www/adminwww/lib/others/select2.min.js',
						'www/adminwww/lib/app/*.js'
						]
					}
				]
			},
			adminLogin: {
				files: [{
					'www/adminwww/js/login/js.min.js' : [
						'www/adminwww/lib/vendor/jquery/jquery.js',
						'www/adminwww/lib/vendor/jquery-ui/jquery-ui.js',
						'www/adminwww/lib/vendor/bootstrap/bootstrap.js',
						'www/adminwww/lib/others/unicorn.login.js',
						'www/adminwww/lib/vendor/nette-forms/netteForms.js',
						'www/adminwww/lib/vendor/nette.ajax.js/nette.ajax.js'
					]
				}]
			},
			adminUploader: {
				files: [{
					'www/adminwww/js/uploader/js.min.js' : [
						'www/adminwww/lib/vendor/blueimp-tmpl/tmpl.js',
						'www/adminwww/lib/app/uploader/load-image.min.js',
						//'www/adminwww/lib/vendor/blueimp-load-image/*.js',
						'www/adminwww/lib/vendor/blueimp-canvas-to-blob/canvas-to-blob.js',
						'www/adminwww/lib/vendor/blueimp-gallery/blueimp-gallery.js',
						'www/adminwww/lib/app/uploader/main.js',
						'www/adminwww/lib/vendor/jquery-file-upload/jquery.fileupload.js',
						'www/adminwww/lib/vendor/jquery-file-upload/jquery.fileupload-process.js',
						'www/adminwww/lib/vendor/jquery-file-upload/jquery.fileupload-image.js',
						'www/adminwww/lib/vendor/jquery-file-upload/jquery.fileupload-audio.js',
						'www/adminwww/lib/vendor/jquery-file-upload/jquery.fileupload-video.js',
						'www/adminwww/lib/vendor/jquery-file-upload/jquery.fileupload-validate.js',
						'www/adminwww/lib/vendor/jquery-file-upload/jquery.fileupload-ui.js',
					]
				}]
			},
			public: {
				files: [{
					'www/public/js/main.js': [
						'www/js/jquery.js',
						'www/js/netteForms.js',
						'www/adminwww/lib/vendor/nette.ajax.js/nette.ajax.js',
						'www/adminwww/lib/vendor/nette.ajax.js/extensions/spinner.ajax.js',
						'node_modules/bootstrap-select/dist/js/bootstrap-select.min.js',
						'node_modules/bootstrap-select/dist/js/i18n/defaults-cs_CZ.js',
						'www/js/application.js',
						'www/js/application.sameHeight.js',
						'www/less/components/form/application.select-submitform.js',
						'www/less/components/tiles/application.tile-dashboard.js',
						'www/less/components/alert/application.alert.js',
						'www/less/components/tab/tabs.js',
						'www/less/components/tab/application.hideEmptyTab.js',
						'www/less/components/button/application.button-toggle.js',
						'www/less/components/button/application.button-hidegroup.js',
						'www/less/components/form/application.select-toggle.js',
						'www/js/vendor/bootstrap-tab-history/bootstrap-tab-history.js',
						// 'www/js/vendor/js-cookie/js.cookie.js',
						'www/js/vendor/tsorter-upravenyprofotbal/dist/tsorter.js',
						'www/js/jquery.rwdImageMaps.min.js',
						'www/js/main.js',
						'www/js/menu.js',
						'www/js/vendor/esgallery/jquery.event.swipe.js',
						'www/js/vendor/esgallery/jquery.mousewheel.js',
						'www/js/vendor/esgallery/jquery.tinyscrollbar.js',
						'www/js/vendor/esgallery/spin.js',
						'www/js/vendor/esgallery/jquery.esgallery.js',
						'www/js/vendor/share-button/share.js',
						'www/less/components/box/gallery.js',
						'www/less/components/article/share.js',
						'www/js/vendor/jquery.gracket.js-master/jquery.gracket.js',
						'www/less/components/bracket/bracket.js',
						'www/js/vendor/magnific-popup/jquery.magnific-popup.js'
					]
				}]
			}
		},

		less: {
		  	development: {
	    		files: {
	    			"www/css/style.css": "www/less/style.less",
	    		},
	    		options: {
	    			sourceMap: true,
	    			sourceMapFileInline: true
	    		}
			}
		},

		copy: {
			main: {
				src: "www/css/style.css.map",
				dest: "www/public/css/style.css.map"
			},
			ltie9: {
				src: 'node_modules/lt-ie-9/lt-ie-9.min.js',
				dest: 'www/public/js/lt-ie-9.min.js'
			}
		},

        cssmin: {
            css : {
                files: {
                    'www/public/css/style.css': [
                    	'www/css/style.css'
                    ]
                }
            }
        },

        remfallback: {
        	options: {
				log: false,
				replace: false,
				ignoreUnsupported: false,
				mediaQuery: false	
			},
			your_target: {
				files: {
					'www/css/style.css': 'www/css/style.css'
				}
			}
        },

        coffee: {
			compile: {
			    options: {
			      	bare: true
			    },
			    files: {
			      	'www/js/main.js': 'www/js/main.coffee', // 1:1 compile
			      	'www/js/menu.js': 'www/js/menu.coffee', // 1:1 compile
			    }
			}
		},

		kss: {
			options: {
				css: '/public/css/style.css',
				template: 'www/_styleguide/kss-node-template/template/'
			},
			dist: {
				files: {
					'www/_styleguide': ['www/less']
				}
			}
		},

		autoprefixer: {
			options: {
				cascade: false,
				browsers: ['> 0.5% in CZ', 'last 5 version', 'ie 8', 'ie 9', 'ie 10']
			},
			no_dest: {
		      	src: 'www/css/style.css' // globbing is also possible here 
		    },
		},

		sprite: {
			flags24: {
				src: 'www/images/flags_iso/*.png',
				retinaSrcFilter: 'www/images/flags_iso/*_@2X.png',
				dest: 'www/images/icon-flags.png',
				retinaDest: 'www/images/icon-flags_@2X.png',
				destCss: 'www/css/icon-flags.css',
				padding: 6,
				cssVarMap: function (sprite) {
					var isoCodeNameAlpha2 = sprite.name;
					var isoCodeNameAlpha3 = "none-" + isoCodeNameAlpha2;
					var isoCodes = flagsIsoCodes;

					for (var key in isoCodes) {
					    if (!isoCodes.hasOwnProperty(key)) {
					        continue;
					    }

					    if (isoCodeNameAlpha2 === key) {
					    	isoCodeNameAlpha3 = isoCodes[key];
					    	break;
					    }
					}

				  	sprite.name = 'flag-' + isoCodeNameAlpha3;
				}
			},
			flags48: {
				src: 'www/images/flags_iso_48/*.png',
				retinaSrcFilter: 'www/images/flags_iso_48/*_@2X.png',
				dest: 'www/images/icon-flags-big.png',
				retinaDest: 'www/images/icon-flags-big_@2X.png',
				destCss: 'www/css/icon-flags-big.css',
				padding: 6,
				cssVarMap: function (sprite) {
					var isoCodeNameAlpha2 = sprite.name;
					var isoCodeNameAlpha3 = "none-" + isoCodeNameAlpha2;
					var isoCodes = flagsIsoCodes;

					for (var key in isoCodes) {
					    if (!isoCodes.hasOwnProperty(key)) {
					        continue;
					    }

					    if (isoCodeNameAlpha2 === key) {
					    	isoCodeNameAlpha3 = isoCodes[key];
					    	break;
					    }
					}

				  	sprite.name = 'flag-big-' + isoCodeNameAlpha3;
				}
			}
		},

		imagemin: {
			static: {
				options: {
					optimizationLevel: 7
				},
				files: {
					'www/public/img/icon-flags.png.neoptimalizovano': 'www/images/icon-flags.png',
					'www/public/img/icon-flags_@2X.png.neoptimalizovano': 'www/images/icon-flags_@2X.png',
					'www/public/img/icon-flags-big.png.neoptimalizovano': 'www/images/icon-flags-big.png',
					'www/public/img/icon-flags-big_@2X.png.neoptimalizovano': 'www/images/icon-flags-big_@2X.png',
				}
			}
		},

		clean: ["temp/cache/latte"],

		watch: {
			scripts: {
				files: [
					'www/adminwww/lib/app/*.js', 
					'www/js/*.js',
					'www/less/**/*.js'
				],
				tasks: ['uglify:public'],
				options: {
					spawn: false,
					livereload: true
				}
			},
			styles: {
				files: ['www/less/**/**/*.less','www/less/**/*.less', 'www/less/*.less'],
				tasks: ['less', 'autoprefixer','remfallback', 'cssmin', 'copy', 'kss'],
				options: {
					spawn: false,
                    livereload: true
				}
			},
			coffeescript: {
				files: ['www/js/*.coffee'],
				tasks: ['coffee', 'uglify:public'],
				options: {
					spawn: false,
                    livereload: true
				}
			},
			latte: {
				files: [
					'app/**/**/**/**/**/**/*.latte',
					'app/**/**/**/**/**/*.latte',
					'app/**/**/**/**/*.latte',
					'app/**/**/**/*.latte',
					'app/**/**/*.latte',
					'app/**/*.latte',
					'app/*.latte',
				],
				tasks: ['clean'],
				options: {
					livereload: true
				}
			}
		}
	});

	// Grunt JIT task - https://github.com/shootaroo/jit-grunt
	// No need to load all tasks separately
	require('jit-grunt')(grunt, {
		bower: 'grunt-bower-task',
		sprite: 'grunt-spritesmith'
	});

	grunt.registerTask('default', ['coffee','uglify:public','less','autoprefixer','remfallback','cssmin', 'copy','kss','watch']);
	grunt.registerTask('admin', ['bower','uglify']);
	grunt.registerTask('flags', ['sprite','imagemin:static','pngminwarning']);
	grunt.registerTask('makecss', ['less', 'autoprefixer','remfallback', 'cssmin', 'copy', 'kss']);

	grunt.registerTask('pngminwarning', function() {
		grunt.log.error();
	  	grunt.log.writeln('Byl použit "imagemin" task pro optimalizaci png, ale služba na webu https://tinypng.com/ minifikuje lépe. Vezmi tedy minifikované obrázky ze složky "www/public/img/", prožeň je ještě danou službou a přepiš je!'['red']);
	  	grunt.log.writeln('Byly vygenerovány soubory www/css/icon-flag-big.css a www/css/icon-flag.css, ke každé vlajce doplň opacity: 1!important;, jinak se nezobrazí ;-)'['red']);
	  	grunt.log.writeln('!!!Pozor - zkontrolovat, zda jsou vlajky na _@2X spritu na stejné pozici, jako na normální verzi, jinak to nebude sedět, třeba slovensko!!! Opravit manuálně, posunout například ve photoshopu.'['red']);
	  	grunt.log.writeln('!!!Pozor - zkontrolovat, zda sedí duplikáty vlajek v souboru components/icon/icon.less, např. NDR je pouze kopie DEU.'['red']);
	});
	
	// No need to create task with the same name as the task itself - see http://gruntjs.com/frequently-asked-questions#why-am-i-getting-a-maximum-call-stack-size-exceeded-error
	//grunt.registerTask('watch', ['watch']);
};