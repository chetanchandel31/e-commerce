import DOMqueries from "@testing-library/dom/types/queries";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { JSXElementConstructor, ReactElement } from "react";
import Wrapper from "./Wrapper";

type CustomRender = (
  ui: ReactElement<any, string | JSXElementConstructor<any>>,
  options?:
    | Omit<
        RenderOptions<typeof DOMqueries, HTMLElement, HTMLElement>,
        "queries"
      >
    | undefined
) => RenderResult<typeof DOMqueries, HTMLElement, HTMLElement>;

/** Most components in this project break if rendered without being wrapped in certain Providers.
 *  This is a util takes care of wrapping the component within all such Providers */
export const customRender: CustomRender = (ui, options) =>
  render(ui, { wrapper: Wrapper, ...options });
