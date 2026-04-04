"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";

interface DoodleFloatProps {
	name: string;
	size?: number;
	className?: string;
	delay?: number;
	float?: boolean;
}

export function DoodleFloat({
	name,
	size = 48,
	className = "",
	delay = 0,
	float = true,
}: DoodleFloatProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);

		observer.observe(node);

		return () => observer.disconnect();
	}, []);

	const style: CSSProperties = {
		animationDelay: `${delay * 0.3}s`,
	};

	const containerStyle: CSSProperties = {
		width: `${size}px`,
		height: `${size}px`,
	};

	return (
		<div
			ref={ref}
			className={`opacity-0 translate-y-8 ${isVisible ? "animate-float-in" : ""} ${className}`}
			style={style}
		>
			<div
				className={`relative ${isVisible && float ? "animate-float float-random" : ""}`}
				style={containerStyle}
			>
				<Image
					src={`/floats/${name}.svg`}
					alt={`${name} doodle`}
					fill
					sizes={`${size}px`}
					className="select-none pointer-events-none object-contain"
					draggable={false}
				/>
			</div>
		</div>
	);
}

export default DoodleFloat;
