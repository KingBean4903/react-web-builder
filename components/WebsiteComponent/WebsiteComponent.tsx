
import styles from "./WebsiteComponent.module.css";

const sections = {
	section: SectionComponent,
	title: TitleComponent,
	image: ImageComponent,
};

export default function WebsiteComponent({ components, handleAddSection } : 
																				 { children: any, handleAddSection: (secId, newId) => void }) {

	const items = components.map(item => {
				const Block = sections[item.tag]
				item = {...item, handleAddSection};
				return <Block key={crypto.randomUUID()} {...item } />
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

function SectionComponent({ handleAddSection, children, role, id} :
													{ role: string, handleAddSection: (secId, newId) => void, id: string, children?: any[] }) {

	const sctnButton : React.CSSProperties = { 
			display: 'flex',
			position: 'absolute',
			bottom: 0,
			left: '45%',
	};

	const items = children.map(item => {
				const Block = sections[item.tag];
				return <Block key={crypto.randomUUID()} {...item} />
	});

	function handleAddSectionBelow() {
		
		handleAddSection(id, crypto.randomUUID());
	}

	return (
		<section onMouseEnter={handleAddSectionBelow} role={role}>
		 {items}
			<button  role="button" type="button" onClick={handleAddSectionBelow}>Add Section</button>
		</section>
	)	
}
