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
    let description = props.value;
    const [value, setValue] = React.useState(description);
    const [selectedTab, setSelectedTab] = React.useState("write");

    return (
        <div className="container">
            <ReactMde
                value={description}
                onChange={value => {
                    setValue(value);
                    props.onChange(value);
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
