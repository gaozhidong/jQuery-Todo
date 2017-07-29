;
(function () {
    'use strict';
    var log = console.log.bind(console);
    var $form_add_task = $('.add-task'),
        task_list = [],
        $task_delete_trigger,
        $task_detail_trigger,
        $task_detail = $('.task-detail'),
        $task_detail_mask = $('.task-detail-mask'),
        current_index,
        $update_form,
        $task_detail_content,
        $task_detail_content_input



    init()
    $form_add_task.on('submit', on_add_task_from_submit)
    $task_detail_mask.on('click', hide_task_detail)

    function on_add_task_from_submit(e) {
        var new_task = {},
            $input;
        /* 禁用默认行为 */
        e.preventDefault();
        /* 获取新Task的值 */
        $input = $(this).find('input[name=content]')
        new_task.content = $input.val();

        /* 如果新Task的值为空 则直接返回 否则继续执行 */
        if (!new_task.content) return;
        /* 存入新Task */
        if (add_task(new_task)) {
            //render_task_list();
            $input.val(null)
        }
    }
    /* 监听打开Task详情事件 */
    function listen_task_detail() {
        var index;
        $('.task-item').on('dblclick', function () {
            index = $(this).data('index')
            show_task_detail(index);
        })

        $task_detail_trigger.on('click', function () {
            var $this = $(this)
            var $item = $this.parent().parent()
            index = $item.data('index')
            show_task_detail(index)
        })
    }
    /* 查看Task详情 */
    function show_task_detail(index) {
        /* 生成详情模板 */
        render_task_detail(index);
        current_index = index
        /* 显示详情模板（默认隐藏） */
        $task_detail.show();
        $task_detail_mask.show();
    }
    /* 更新Task */
    function updated_task(index, data) {
        if (!index || !task_list[index]) return;

        task_list[index] = data;
        refresh_task_list()

    }
    /* 隐藏Task 详情模板*/
    function hide_task_detail() {
        $task_detail.hide();
        $task_detail_mask.hide();
    }

    /* 渲染指定Task的详细信息 */
    function render_task_detail(index) {
        if (index === undefined || !task_list[index]) return;
        var item = task_list[index]
        var tpl = `
            <form>
				<div class="content">					
					${item.content}
                </div>
                <div class="input-item">
                    <input style="display:none;" type="text" name="content" value="${item.content || ''}" >
                </div>
				<div>
					<div class="desc input-item" >
						<textarea name="desc" >${item.desc  || '' }</textarea>
					</div>
				</div>				
				<div class="remind input-item">
					<input name="remind_date" type="date" value="${item.remind_date}">
                </div>
                <div class="input-item">
                    <button type="submit">更新</button>
                <div>
			</form>
        `
        /* 用新模板替换替换旧模板 */
        $task_detail.html(null)
        $task_detail.html(tpl)
        /* 选中其中的form元素，因为之后会使用其监听submit事件 */
        $update_form = $task_detail.find('form')
        /* 选中显示Task内容的元素 */

        $task_detail_content = $update_form.find('.content')
        /* 选中显示Task input 元素 */
        $task_detail_content_input = $update_form.find('[name=content]')

        /* 双击内容显示input  隐藏自己 */
        $task_detail_content.on('dblclick', function () {
            $task_detail_content_input.show()
            $task_detail_content.hide()
        })


        $update_form.on('submit', function (e) {
            e.preventDefault();
            var data = {};
            /* 获取表单中各个input的值 */
            data.content = $(this).find('[name= content]').val();
            data.desc = $(this).find('[name=desc]').val();
            data.remind_date = $(this).find('[name=remind_date]').val();

            updated_task(index, data)
            hide_task_detail();
        })

    }


    /* 查找并监听所有删除按钮的点击事件 */
    function listen_task_delete() {
        $task_delete_trigger.on('click', function () {
            var $this = $(this);
            /* 找到删除按钮所在的task元素 */
            var item = $this.parent().parent();
            var index = item.data('index');
            /* 确认删除 */
            var tmp = confirm('确定删除？')
            tmp ? delete_task(index) : null;

        })
    }


    function add_task(new_task) {
        /* 将新Task推入到task_list */
        task_list.push(new_task)
        /* 更新localStorate */
        refresh_task_list()
        return true;
    }
    /* 刷新locaStroage数据并渲染tpl */
    function refresh_task_list() {
        store.set('task_list', task_list);
        render_task_list()
    }
    /* 删除一条Task */
    function delete_task(index) {
        /* 如果没有index 或者 index 不存在直接返回 */
        if (index === undefined || !task_list[index]) return;

        delete task_list[index];
        /* 更新localStorate */
        refresh_task_list();

    }


    function init() {
        task_list = store.get('task_list') || [];
        if (task_list.length) {
            render_task_list();

        }
    }
    /* 渲染所有Task模板 */
    function render_task_list() {
        var $task_list = $('.tasks-list');
        $task_list.html('')
        for (var i = 0; i < task_list.length; i++) {
            var $task = render_task_item(task_list[i], i)
            $task_list.prepend($task)
        }

        $task_delete_trigger = $('.action.delete')
        $task_detail_trigger = $('.action.detail')
        listen_task_delete();
        listen_task_detail()
    }
    /* 渲染单条Task模板 */
    function render_task_item(data, index) {
        if (!data || !index) return;
        var list_item_tpl = `
                <div class="task-item" data-index = "${index}">		
                    <span><input type="checkbox"></span>
                    <span class="task-content">${data.content}</span>
                    <span class="float-right">
                        <span class="action delete"> 删除</span>
                        <span class="action detail"> 详细</span>
                    </span>
                </div>
            `
        return $(list_item_tpl)
    }
})()