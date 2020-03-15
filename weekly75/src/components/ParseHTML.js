/*
ParseHTML-React-Native (Version 0.1)
Coded by: Simar (github.com/iSimar)
GitHub Project: https://github.com/iSimar/ParseHTML-React-Native
*/

'use strict';

import React from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';

class ParseHTML extends React.Component {
  constructor(props) {
    super(props);
    let defaultTagToStyle = {
      '<b>': {fontWeight: 'bold'},
      '<strong>': {fontWeight: 'bold'},
      '<i>': {fontStyle: 'italic'},
      '<normal>': {fontStyle: 'normal'},
      '<em>': {fontStyle: 'italic'},
      '<img>': {},
    };
    if (this.props.customTagToStyle) {
      for (let i in Object.keys(this.props.customTagToStyle)) {
        defaultTagToStyle[
          Object.keys(this.props.customTagToStyle)[i]
        ] = this.props.customTagToStyle[
          Object.keys(this.props.customTagToStyle)[i]
        ];
      }
    }

    this.state = {
      tagToStyle: defaultTagToStyle,
    };
  }

  _getNextHTMLTag = (html_code, tags_to_look_for) => {
    let min = -1;
    let nextTag = '';
    // console.log(html_code)
    for (let i = 0; i < tags_to_look_for.length; i++) {
      let tag = tags_to_look_for[i];
      let nextIndex = html_code.indexOf(tag);
      if (min === -1) {
        min = nextIndex;
        nextTag = tag;
      } else {
        if (min > nextIndex && nextIndex != -1) {
          min = nextIndex;
          nextTag = tag;
        }
      }
    }
    return {tag: nextTag, indexStart: min};
  };

  _buildHTMLParseTree = html_code => {
    // console.log(html_code)
    return this._buildHTMLParseTreeOverload(html_code, []);
  };

  _buildHTMLParseTreeOverload = (html_code, segments, style) => {
    if (segments === undefined) {
      segments = [];
    }
    if (style === undefined) {
      segments = [];
    }
    let nextTag = this._getNextHTMLTag(
      html_code,
      Object.keys(this.state.tagToStyle),
    );
    // console.log(nextTag)
    if (nextTag.indexStart !== -1) {
      if (nextTag.indexStart > 0) {
        segments.push({
          text: html_code.slice(0, nextTag.indexStart),
          style: style,
        });
      }
      let endTag = '</' + nextTag.tag.slice(1);
      let indexEnd = html_code.indexOf(endTag);
      let new_text = html_code.slice(
        nextTag.indexStart + nextTag.tag.length,
        indexEnd,
      );
      // console.log(new_text)
      segments.push({
        segments: this._buildHTMLParseTreeOverload(
          new_text,
          [],
          style.concat([this.state.tagToStyle[nextTag.tag]]),
        ),
      });
      return this._buildHTMLParseTreeOverload(
        html_code.slice(indexEnd + endTag.length, html_code.length),
        segments,
      );
    } else {
      if (html_code !== '') {
        // console.log(html_code)
        segments.push({text: html_code, style: style});
      }
      return segments;
    }
  };

  _renderHTMLParseTree = parseTree => {
    return parseTree.map(segment => {
      if (segment.segments) {
        return this._renderHTMLParseTree(segment.segments);
      }
      if (segment.text.indexOf('<img') === 0) {
        return (
          <Image
            style={segment.style}
            source={{uri: segment.text.match(/\/img\/\w+/g)[0]}}
          />
        );
      }

      return <Text style={segment.style}>{segment.text}</Text>;
    });
  };

  _decodeHTMLEntities = str => {
    // console.log(str.replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)" rel="nofollow">(.*)?<\/a>/g, "$1"))
    return String(str)
      .replace(/&#x2F;/g, '/')
      .replace(/&#x27;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(
        /<a\s+(?:[^>]*?\s+)?href="([^"]*)" rel="nofollow">(.*)?<\/a>/g,
        '$1',
      )
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<')
      .replace(/<br(>|\s|\/)*/g, '\n');
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this._renderHTMLParseTree(
          this._buildHTMLParseTree(this._decodeHTMLEntities(this.props.code)),
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default ParseHTML;
