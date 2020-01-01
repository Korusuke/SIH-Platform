import * as React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

export default function Editor(props) {
    const [value, setValue] = React.useState(props.value);
    const [selectedTab, setSelectedTab] = React.useState("write");

    return (
        <div className="container">
            <ReactMde
                value={value}
                onChange={value => {
                    setValue(value);
                    props.onChange(value);
                    console.log('hii')
                }}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={markdown =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
            />
        </div>
    );
}
