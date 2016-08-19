<template>
	<div class="container">
		<div class="panel panel-default">
			<div class="panel-heading">
				学生列表
				<a style="float: right" href="#!/edit-demo"><i class="glyphicon glyphicon-plus"></i>添加</a>
			</div>
			<div class="panel-body">
				<line-form :model.sync="qmodel" :schema="searchSchema" :on-submit="query" submit-text="查询"></line-form>
			</div>
			<table v-zptable="rows" url="/path/to/list" :lazy="false" :ctrl="ctrl" :qmodel="qmodel" class="table table-bordered table-hover">
				<thead>
					<tr class="active">
						<th width="10%">学号</th>
						<th width="30%">学生姓名</th>
						<th width="30%">年级</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(index, row) in rows">
						<td>{{row.no}}</td>
						<td>
							<input type="text" v-model="row.name" v-if="index == editing" />
							<span v-else>{{row.name}}</span>
						</td>
						<td>
							<input type="text" v-model="row.grade" v-if="index == editing" />
							<span v-else>{{row.grade}}</span>
						</td>
						<td>
							<a v-if="editing != index" href="javascript:void(0)" @click="beginEdit(index)">快速编辑</a>
							<a v-if="editing == index" href="javascript:void(0)" @click="saveEdit">保存</a>
							<a v-if="editing == index" href="javascript:void(0)" @click="quitEdit">放弃修改</a>
							<a href="#!/edit-demo">编辑</a>
							<a href="javascript:void(0)" @click="delete(row.i)">删除</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<requirements>
	_:			'zptable'
	core:		'core'
</requirements>

<script>
	return {
		mixins: [core.listPageMixin],
		components: {
			'line-form': core.loadComponent('app/components/line-form.vue'),
		},
		data: function() {
			return {
				// 如果需要自定义条件查询，请定义qmodel和searchSchema
				qmodel: {
					name: '',
				},
				searchSchema: [
					{name: 'name', type: 'text', label: '姓名'},
				],
			}
		},
		route: {
			activate: function() {
				this.setBreadcrumb([
					{title:'首页', href: '#!/'},
					{title:'学生列表'},
				])
			},
		},
		methods: {
			// 该函数返回快速编辑保存时提交的目标url和数据form
			getSaveInfo: function(row) {
				return {
					url: '/path/to/saveedit/',
					form: {
					},
				}
			}
		},
	}
</script>

