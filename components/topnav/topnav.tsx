import styles from './topnav.module.css'
import Image from 'next/image'


export default function TopNav() {
	
	return(
				<>
						<div className={styles.container}>
							<div className={styles.topNav}>
							</div>
							<div className={styles.btmNav}>
								<h4>Page : </h4> 
								<select>
									<option value="Home">Home</option>
								</select>
								<div className={styles.responsive}>
										<button type="button" className="icon-button">
												<Image src="computer.svg" alt="Desktop" width="24" height="24" />
										</button>
										<button type="button" className="icon-button">
											<Image src="mobile.svg" alt="Mobile" width="24" height="24" />
										</button>
								</div>
							</div>
						</div>
				</>

	)


}
