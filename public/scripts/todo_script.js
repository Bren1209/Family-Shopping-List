$('ul').on('click', 'li', function(){
    $(this).toggleClass('line-through')
})

$('.button').on('click', function(){
    $(this).parent().fadeOut(500)
})