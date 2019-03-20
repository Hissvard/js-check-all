function checkAllReload() {
    $('.js-check-all:not(.js-check-all-init)').each(function () {
        var self = this;

        $(self).addClass('js-check-all-init');

        var target = $(self).data('target');
        var $target = $(target);

        $(self).on('click', function () {
            if (!$target[0]) {
                console.error('Target doesn\'t exist: ' + target);
                return;
            }

            $target.each(function (i, el) {
                if ($(el).is(':disabled') || $(el).is('[readonly]')) {
                    return;
                }
                $(el).prop('checked', $(self).is(':checked') ? true : false);
            });
        });

        $target.on('change', function () {
            reloadState();
        });

        function reloadState() {
            $(self).prop('indeterminate', false);

            if (allTargetsChecked()) {
                $(self).prop('checked', true);
            } else if (noTargetsChecked()) {
                $(self).prop('checked', false);
            } else {
                $(self).prop('indeterminate', true);
            }
        }

        function allTargetsChecked() {
            var $checkableTargets = $target.filter(':not(:disabled):not([readonly])');
            return $checkableTargets.filter(':checked').length === $checkableTargets.length;
        }

        function noTargetsChecked() {
            var $checkableTargets = $target.filter(':not(:disabled):not([readonly])');
            return $checkableTargets.filter(':checked').length === 0;
        }
    });
};
