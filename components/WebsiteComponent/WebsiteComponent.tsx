

const sections = {
	section: SectionComponent,
	title: TitleComponent,
	image: ImageComponent,
};

export default function WebsiteComponent({ components } : { any }) {

	const items = components.map(item => {
				const Block = sections[item.tag]
				return <Block key={crypto.randomUUID()} {...item} />
	})

	return <>{items}</>
	

}


function TitleComponent({ role, text }) {
	
	return(
			<> 
				<h1 role={role}>{text}</h1>
			</>
	)
	
}

function ImageComponent({ role, src, alt }) {
	
	return(
			<> 
				<img role={role} src={src} alt={alt} />
			</>
	)
	
}

function SectionComponent({ children } : { children?: any[] }) {

	const items = children.map(item => {
				const Block = sections[item.tag];
				return <Block key={crypto.randomUUID()} {...item} />
	});

	return (<section>{items}</section>)	
}
