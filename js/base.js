;
(function () {
    'use strict';
    var log = console.log.bind(console);
    var $form_add_task = $('.add-task')
    var new_task = {}
    var task_list = {}

    init()
    $form_add_task.on('submit', function (e) {
        var new_task = {}
        /* 禁用默认行为 */
        e.preventDefault();
        /* 获取新Task的值 */
        var $input = $(this).find('input[name=content]')
        new_task.content = $input.val();

        /* 如果新Task的值为空 则直接返回 否则继续执行 */
        if (!new_task.content) return;
        /* 存入新Task */
        if (add_task(new_task)) {
            render_task_list();
            $input.val(null)
        }

    })

    function add_task(new_task) {
        /* 将新Task推入到task_list */
        task_list.push(new_task)
        /* 更新localStorate */
        store.set('task_list', task_list);
        return true;
    }

    function init() {
        task_list = store.get('task_list') || [];
        if (task_list.length) {
            render_task_list();
        }
    }

    function render_task_list() {
        var $task_list = $('.tasks-list');
        $task_list.html('')
        for (var i = 0; i < task_list.length; i++) {
            var $task = render_task_tpl(task_list[i])
            $task_list.append($task)
        }

    }

    function render_task_tpl(data) {

        var list_item_tpl = `
                <div class="task-item">		
                    <span><input type="checkbox"></span>
                    <span class="task-content">${data.content}</span>
                    <span class="float-right">
                        <span class="action"> 删除</span>
                        <span class="action"> 详细</span>
                    </span>
                </div>
            `
        return $(list_item_tpl)
    }
})()