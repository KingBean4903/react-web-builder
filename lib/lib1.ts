

export const pages : any= [

  {
      id: 1001,
      name: "Home",
      sections: [
          {
              tag: "Header",
              elements: [
                  {
                      id: "column_1",
                      tag: "Column",
                      elements: [
                            {
                              id: "ele_1",
                              props: { src: "", alt: "Logo" },
                              tag: "MediaImg",
                            },
                      ],
                      style: {
                          width: "30%",
                          position: "relative",
                      }
                  },
                  {
                      id: "column_2",
                      tag: "Column",
                      elements: [
                            {
                              id: "ele_1",
                              children: [ 
                                    {
                                      tag:  "IconButton", props: { text: "cart" }
                                    },
                                    {
                                      tag:  "IconButton", props: { text: "bell" }
                                    }
                               ],
                              tag: "ActionBar",
                            },
                            {
                                id: "ele_2",
                                tag: "HorizontalMenu",
                                style: { display:"flex", padding: ".25em .25em" },
                                isFocussed: true,
                                props: { links : ["Home", "About", "Lifestyle", "Shop", "Contact" ] }
                            }
                      ],
                      style: {
                          position: "relative",
                          width: "70vw",
                          display:"flex",
                          padding: 0,
                          margin: 0,
                          flexDirection: "column",
                      }
                  },
              ],
              style : { 
                display: "flex",


                width: "100vw",
                height: "10vh", backgroundColor: "#BDBDBD"}
          }
      ]
  }  
];
