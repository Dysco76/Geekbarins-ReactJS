import { IconButton, Popover, Button } from "@material-ui/core"
import { MoreHoriz } from "@material-ui/icons"
import { useState } from "react"

export const ContextMenu = ({
  actions = [{ name: "action" }],
  className,
  children,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const isOpened = Boolean(anchorEl)

  const openPopover = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const closePopover = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton size="small" onClick={openPopover} className={className}>
        {children || <MoreHoriz fontSize="small" />}
      </IconButton>
      <Popover
        open={isOpened}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {actions.map(
          (action, i) =>
            action && (
              <div key={i}>
                <Button
                  size="small"
                  fontSize="small"
                  fullWidth={true}
                  onClick={() => {
                    action.func()
                    action.shouldContextClose && closePopover()
                  }}
                >
                  {action.name}
                </Button>
              </div>
            ),
        )}
      </Popover>
    </>
  )
}
