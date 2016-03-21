
(function($) {
	$.fn.gtreetable.defaults.languages.mn = {
		save : 'Хадгалах',
		cancel : 'Болих',
		action : 'Үйлдэл',
		actions : {
			createSelect : 'Ангилал сонгох',
			createProperty: 'Үзүүлэлт',
			createBefore : 'Дээр нь үүсгэх',
			createAfter : 'Доор нь үүсгэх',
			createFirstChild : 'Эхний мөчир үүсгэх',
			createLastChild : 'Сүүлчийн мөчир үүсгэх',
			update : 'Засах',
			'delete' : 'Устгах'
		},
		messages : {
			onDelete : 'Өгөгдлийг устгахдаа итгэлтэй байна уу?',
			onNewRootNotAllowed : 'Үндсэн цэс нэмэхдээ улаан товчыг дарна уу.',
			onMoveInDescendant : 'The target node should not be descendant.',
			onMoveAsRoot : 'Үндсэн мод байж болохгүй.'
		}
	};
}(jQuery));
