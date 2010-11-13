class PlatformActionTableViewRow extends Citrus.ActionRows.ActionTableViewRow
	type: "PlatformActionTableViewRow"
	icon: () ->
		Citrus.getIconPath(@action.iconName)

Citrus.registerActionViewRow PlatformActionTableViewRow
