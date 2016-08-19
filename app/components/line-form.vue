<template>
	<form class="form-inline">
		<div class="form-group" v-for="(index, info) in innerschema"
				:class="{'has-error': info.errors.length > 0}">
			<label :for="'_id_' + info.name">
				{{info.label}}
			</label>
			<input v-if="info.type == 'text'"
				type="text"
				class="form-control"
				@input="fieldChanged(index)"
				v-model="model[info.name]" />
			<input v-if="info.type == 'number'"
				type="number"
				class="form-control"
				@input="fieldChanged(index)"
				v-model="model[info.name]" />
			<input v-if="info.type == 'date'"
				type="date"
				class="form-control"
				@input="fieldChanged(index)"
				v-model="model[info.name]" />
			<input v-if="info.type == 'datetime'"
				type="datetime"
				class="form-control"
				@input="fieldChanged(index)"
				v-model="model[info.name]" />
			<select v-if="info.type == 'select'"
				class="form-control"
				style="width: 100%"
				v-select2="model[info.name]"
				@input="fieldChanged(index)"
				>
				<option v-for="opt in info.options" :value="opt.value">{{opt.text}}</option>
			</select>
			<textarea v-if="info.type == 'textarea'"
				class="form-control"
				style="height: 100px"
				@input="fieldChanged(index)"
				v-model="model[info.name]">
			</textarea>
			<div v-if="info.type == 'radio'"
					class="radio" v-for="opt in info.options">
				<label>
					<input type="radio" :value="opt.value" v-model="model[info.name]" />
					{{opt.text}}
				</label>
			</div>
			<div v-if="info.type == 'checkbox'"
					class="checkbox" v-for="opt in info.options">
				<label>
					<input type="checkbox" :value="opt.value" v-model="model[info.name]" />
					{{opt.text}}
				</label>
			</div>
		</div>
		<button class="btn" type="button"
			:class="{'btn-primary': !hasError, 'btn-disabled': hasError}"
			:disabled="hasError"
			@click="submitClicked">{{submitText}}</button>
	</form>
</template>

<requirements>
	_:	'app/components/widgets'
	$:	'jquery'
</requirements>

<script>
	return {
		props: {
			schema: null,
			model: null,
			onSubmit: null,
			submitText: {
				default: '提交',
			},
		},
		data: function() {
			return {
				innerschema: this.schema.map(function(oi) {
					var info = $.extend({}, oi)
					if (!info.errors) {
						info.errors = []
					}
					return info
				}),
				hasError: false,
			}
		},
		methods: {
			submitClicked: function() {
				for (var i = 0; i < this.innerschema.length; i++) {
					this.fieldChanged(i)
				}
				if (!this.hasError && this.onSubmit) {
					this.onSubmit()
				}
			},
			fieldChanged: function(index) {
				var info = this.innerschema[index],
					value = this.model[info.name]
				if (info.validators) {
					info.errors = info.validators
						.map(function(validator) {
							return validator(value)
						})
						.filter(function(msg) {
							return !!msg
						})
				}
			},
		},
		computed: {
			hasError: function() {
				return this.innerschema.filter(function(info) {
					return info.errors.length > 0
				}).length > 0
			}
		},
	}
</script>


