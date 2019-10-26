(function($) {

    var form = $("#signup-form");
    form.steps({
        headerTag: "h3",
        bodyTag: "fieldset",
        transitionEffect: "fade",
        labels: {
            previous : 'Previous',
            next : 'Next',
            finish : 'Submit',
            current : ''
        },
        titleTemplate : '<div class="title"><span class="title-text">#title#</span><span class="title-number">0#index#</span></div>',
        onFinished: function (event, currentIndex)
        {
            alert('Sumited');
        }
    });
    
    
})(jQuery);
