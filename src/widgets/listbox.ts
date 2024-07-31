import Gtk from "gi://Gtk?version=3.0";
import { type BaseProps, register, type Widget } from "./widget.js";

// TODO:

export type ListBoxProps<
  Attr = unknown,
  Self = ListBox<Attr>,
> = BaseProps<Self, Gtk.ListBox.ConstructorProperties, Attr>;

export function newListBox<
  Attr = unknown,
>(...props: ConstructorParameters<typeof ListBox<Attr>>) {
  return new ListBox(...props);
}

export interface ListBox<Attr> extends Widget<Attr> {}
export class ListBox<Attr> extends Gtk.ListBox {
  static {
    register(this);
  }

  constructor(props: ListBoxProps<Attr> = {}) {
    super(props as Gtk.ListBox.ConstructorProperties);
  }
}

export default ListBox;
