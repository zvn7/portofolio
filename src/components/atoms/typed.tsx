import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

interface TypedTextProps {
	strings: string[];
}

const TypedText: React.FC<TypedTextProps> = ({ strings }) => {
	const typedRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const options = {
			strings: strings,
			typeSpeed: 50,
			backSpeed: 25,
			backDelay: 2000,
			loop: true,
		};

		const typed = new Typed(typedRef.current!, options);

		return () => {
			typed.destroy();
		};
	}, [strings]);

	return <span ref={typedRef}></span>;
};

export default TypedText;
