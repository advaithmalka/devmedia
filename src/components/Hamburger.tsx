import React, { forwardRef } from "react";
interface Prop {
	_id: string;
	ref: any;
}
const Hamburger = forwardRef((props: Prop, ref: any) => {
	return (
		<span
			className="hamburger-icon m-0 scale-75 "
			id={props._id}
			ref={ref}
			style={{ cursor: "pointer" }}
		>
			<span className="bar" />
			<span className="bar" />
			<span className="bar" />
		</span>
	);
});
export default Hamburger;
