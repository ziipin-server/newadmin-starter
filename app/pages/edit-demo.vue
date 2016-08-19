<template>
	<div class="container">
		<data-form
			:model.sync="model"
			:schema="schema"
			:on-submit="save"
			>
		</data-form>
	</div>
</template>

<requirements>
	core:		'core'
	validators: 'validators'
	toastr:		'toastr'
</requirements>

<script>
	return {
		data: function() {
			return {
				model: {
				},
				schema: [
					{name: 'no', type: 'number', label: '学号'},
					{name: 'name', type: 'text', label: '姓名',
						validators: [
							validators.required(),
						],
					},
					{name: 'Type', type: 'select', label: '年级',
						options: [
							{text: '大一', value: 1},
							{text: '大二', value: 2},
							{text: '大三', value: 3},
							{text: '大四', value: 4},
						],
					}
				],
			}
		},
		components: {
			dataForm: core.loadComponent('app/components/form.vue'),
		},
		route: {
			activate: function() {
				this.setBreadcrumb([
					{title:'首页', href: '#!/'},
					{title:'学生列表', href: '#!/list-demo'},
					{title:'编辑学生信息'},
				])
			},
		},
		ready: function() {
			this.getData()
		},
		methods: {
			getData: function() {
				var d = this.getForm('/path/to/edit/', {id: this.$route.params.id})
					.done((function(data) {
						this.model = data
					}).bind(this))
			},
			save: function() {
				this.submitForm('/path/to/edit/', {
					id: this.$route.params.id
			}, this.model).done(function() {
				toastr.success('保存成功')
			}).fail(function() {
				toastr.error('保存失败')
			})
			},
		},
	}
</script>
