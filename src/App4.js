import React, { useState, useRef, useEffect } from 'react';
import { CanvasRoot, View, Text, ScrollView } from './primitives';

const fontFamily = 'Helvetica Neue';
export default function App() {
  return (
    <CanvasRoot style={{ height: '100%', width: '100%' }}>
      <ScrollView
        style={{ backgroundColor: 'white' }}
        contentContainerStyle={{
          backgroundColor: 'white',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: '#20232a',
            flex: 0,
            widthPct: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              height: 60,
              flex: 0,
              widthPct: 90,
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <View style={{ flex: 0, widthPct: 16 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#61dafb',
                  fontWeight: 700,
                  fontFamily: fontFamily,
                }}
              >
                React
              </Text>
            </View>
            <View style={{ paddingLeft: 15, paddingRight: 15 }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily,
                  fontWeight: 300,
                  fontSize: 16,
                }}
              >
                Docs
              </Text>
            </View>
            <View style={{ paddingLeft: 15, paddingRight: 15 }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily,
                  fontWeight: 300,
                  fontSize: 16,
                }}
              >
                Tutorial
              </Text>
            </View>
            <View style={{ paddingLeft: 15, paddingRight: 15 }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily,
                  fontWeight: 300,
                  fontSize: 16,
                }}
              >
                Blog
              </Text>
            </View>
            <View style={{ paddingLeft: 15, paddingRight: 15 }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily,
                  fontWeight: 300,
                  fontSize: 16,
                }}
              >
                Community
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignSelf: 'flex-end',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingRight: 10,
                  paddingLeft: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily,
                    fontSize: 14,
                    fontWeight: 400,
                    color: 'white',
                  }}
                >
                  v16.8.6
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingRight: 10,
                  paddingLeft: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily,
                    fontSize: 14,
                    fontWeight: 400,
                    color: 'white',
                  }}
                >
                  Languages
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingRight: 10,
                  paddingLeft: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily,
                    fontSize: 14,
                    fontWeight: 400,
                    color: 'white',
                  }}
                >
                  Github
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#282c34',
            paddingTop: 95,
            paddingBottom: 85,
            alignItems: 'center',
            widthPct: 100,
          }}
        >
          <Text
            onClick={() => alert('heyyyy')}
            style={{ color: '#61dafb', fontSize: 60, fontWeight: 700 }}
          >
            HEY FULLSTACK
          </Text>
          <View style={{ paddingTop: 20, widthPct: 100, alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 200,
                fontFamily,
                color: 'white',
              }}
            >
              A JavaScript library for building user interfaces
            </Text>
          </View>
          <View
            style={{
              paddingTop: 65,
              widthPct: 100,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                backgroundColor: '#61dafb',
                flex: 0,
                paddingTop: 15,
                paddingBottom: 15,
                paddingLeft: 25,
                paddingRight: 25,
                marginRight: 30,
              }}
            >
              <Text style={{ fontFamily, fontSize: 20, color: 'black' }}>
                Get Started
              </Text>
            </View>
            <Text
              style={{
                fontFamily,
                fontSize: 20,
                fontWeight: 400,
                color: '#61dafb',
              }}
            >
              Take The Tutorial &#8250;
            </Text>
          </View>
        </View>
        <View
          style={{
            widthPct: 90,
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingTop: 65,
            paddingBottom: 60,
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontFamily,
                  fontSize: 24,
                  fontWeight: 300,
                  color: '#6d6d6d',
                }}
              >
                Declarative
              </Text>
            </View>
            <Text
              style={{
                fontFamily,
                fontSize: 17,
                fontWeight: 400,
                lineHeight: 28,
              }}
            >
              React makes it painless to create interactive UIs. Design simple
              views for each state in your application, and React will
              efficiently update and render just the right components when your
              data changes.
            </Text>
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontFamily,
                  fontSize: 17,
                  fontWeight: 400,
                  lineHeight: 28,
                }}
              >
                Declarative views make your code more predictable and easier to
                debug.
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, marginLeft: 40 }}>
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontFamily,
                  fontSize: 24,
                  fontWeight: 300,
                  color: '#6d6d6d',
                }}
              >
                Component-Based
              </Text>
            </View>
            <Text
              style={{
                fontFamily,
                fontSize: 17,
                fontWeight: 400,
                lineHeight: 28,
              }}
            >
              Build encapsulated components that manage their own state, then
              compose them to make complex UIs.
            </Text>
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontFamily,
                  fontSize: 17,
                  fontWeight: 400,
                  lineHeight: 28,
                }}
              >
                Since component logic is written in JavaScript instead of
                templates, you can easily pass rich data through your app and
                keep state out of the DOM.
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, marginLeft: 40 }}>
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontFamily,
                  fontSize: 24,
                  fontWeight: 300,
                  color: '#6d6d6d',
                }}
              >
                Learn Once, Write Anywhere
              </Text>
            </View>
            <Text
              style={{
                fontFamily,
                fontSize: 17,
                fontWeight: 400,
                lineHeight: 28,
              }}
            >
              We don’t make assumptions about the rest of your technology stack,
              so you can develop new features in React without rewriting
              existing code.
            </Text>
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontFamily,
                  fontSize: 17,
                  fontWeight: 400,
                  lineHeight: 28,
                }}
              >
                React can also render on the server using Node and power mobile
                apps using React Native.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </CanvasRoot>
  );
}
